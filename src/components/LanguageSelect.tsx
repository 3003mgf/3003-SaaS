'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LanguagesSupported, LanguagesSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";


const LanguageSelect = () => {

  const subscription = useSubscriptionStore(state => state.subscription);
  const isPro = subscription?.status === "active";
  
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore(state => [state.language, state.setLanguage, state.getLanguages, state.getNotSupportedLanguages])
  
  const pathName = usePathname();
  const isChatPage = pathName?.includes("/chat");

  if(!isChatPage) return null;

  return ( 
    <Select onValueChange={(value: LanguagesSupported)=> setLanguage(value)}>
      <SelectTrigger className="w-[150px] sm:w-[120px] md:w-[150px] text-black dark:text-white">
        <SelectValue placeholder={LanguagesSupportedMap[language]} />
      </SelectTrigger>

      <SelectContent>
        {subscription === undefined ? (
          [...Array(10)].map((_, i) => (
            <SelectItem 
              key={i} 
              value={"null"}
              disabled
            >
              <Skeleton className="h-3 w-full" />
            </SelectItem>
          ))
        ):(
          <>
            {getLanguages(isPro).map(language => (
              <SelectItem 
                key={language} 
                value={language}
                onClick={()=> setLanguage(language)}
              >
                {LanguagesSupportedMap[language]}
              </SelectItem>
            ))}
            {getNotSupportedLanguages(isPro).map(language =>(
              <Link prefetch={false} href="/register" key={language}>
                <SelectItem
                  value={language}
                  disabled
                  className="bg-gray-300/50 dark:bg-gray-100/20 text-gray-500 dark:text-white py-2 my-1"
                >
                  {LanguagesSupportedMap[language]}
                </SelectItem>
              </Link>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
   );
}
 
export default LanguageSelect;
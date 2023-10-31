import { UserButton } from "./UserButton";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@base/auth";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";


const Header = async() => {

  // NOTE: We need NEXTAUTH_URL & NEXTAUTH_SECRET IN .env.local
  const session = await getServerSession(authOptions);
  // console.log(session);
    

  return ( 
  <header className="bg-white dark:bg-gray-900 sticky top-0 z-50">
    <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto">
      <Logo/>

      <div className="flex-1 flex items-center justify-end space-x-4">
        {/* LanguageSelect */}


        {/* If Session && */}
          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessagesSquareIcon className="h-5 w-5"/>
              </Link>
              <CreateChatButton/>
            </>
          ):(
            <Link href="'/pricing">Pricing</Link>
          )}
        {/* --- */}


        {/* DarkMode */}
        <DarkModeToggle/>

        {/* User Button */}
        <UserButton name={session?.user?.name!} image={session?.user?.image!} session={session}/>

      </div>
    </nav>

    {/* Upgrade Banner */}
    <UpgradeBanner/>
  </header>
  );
}
 
export default Header;
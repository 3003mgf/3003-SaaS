import { Subscription } from "@/types/Subscription";
import { create } from "zustand";

export type LanguagesSupported = 
  | "en"
  | "es"
  | "fr"
  | "de"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar"


export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latine",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic"
}

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set)=> ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription })
}))


interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
};

export const useLanguageStore = create<LanguageState>((set)=> ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // If is Pro return all languages
    if(isPro) return Object.keys(LanguagesSupportedMap) as LanguagesSupported[]
    
    // If is not Pro return only first two
    return Object.keys(LanguagesSupportedMap).slice(0, 2) as LanguagesSupported[]
  },
  getNotSupportedLanguages: (isPro:boolean) => {
    // Pro has all languages
    if(isPro) return [];

    // Not Pro has 8 not supported languages
    return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[];
  }
}))
import { getDictionary } from '@/helpers/dictionaries'
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react'

interface LanguageContextProps {
  dict: Record<string, any>
  setDict: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

interface LanguageContextProviderProps {
  children: ReactNode
}

export const LanguageContextProvider = ({ children }: LanguageContextProviderProps) => {
  //? Dictionary
  const [dict, setDict] = useState<Record<string, any>>({})
  const currentLng = localStorage.getItem('lng')

  const getDict = useCallback(async () => {
    const lang = await getDictionary(currentLng || 'zh')
    setDict(lang)
  }, [currentLng])

  useEffect(() => {
    if (dict) {
      getDict()
    }
  }, [dict, getDict])

  useEffect(() => {
    getDict()
  }, [getDict])

  return <LanguageContext.Provider value={{ dict, setDict }}>{children}</LanguageContext.Provider>
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageContextProvider')
  }
  return context
}

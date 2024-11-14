import { useLanguageContext } from '@/context/LanguageContext'
import { Icons, LogoChina, LogoH, ResponsiveImage, Services } from '@/components'
import Link from 'next/link'

export default function Footer() {
  // ? Dictionary
  const translation = useLanguageContext()

  return (
    <footer className="pt-4 mt-8 border-t border-gray-200 ">
      <div className="container px-3  space-y-8 mx-auto ">
        {/* Logo & scroll to top */}
        <div className="flex justify-between">
          <div>
            {translation?.dict?.lang === '中文' ? (
              <LogoChina className="w-32 h-10 mb-6" />
            ) : (
              <LogoH className="w-32 h-10 mb-6" />
            )}
            <div className="flex flex-col gap-y-2 lg:flex-row lg:space-x-5">
              <span>{translation?.dict?.footer?.support}</span>
              <span className="hidden lg:block bg-gray-300 w-[2px]" />
              <span>{translation?.dict?.footer?.wechat}：huanghanzhilian</span>
            </div>
          </div>
          <div className="min-w-max">
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center px-3 py-1 border border-gray-300 rounded-md"
            >
              <span className="text-sm ">{translation?.dict?.footer?.top}</span>
              <Icons.ArrowUp className="text-gray-400 dark:text-gray-200 h-7 w-7" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <Services />
        </div>

        <div className="space-y-8 lg:flex lg:items-start lg:justify-between">
          {/* socials */}
          <div className="flex items-center justify-between">
            <p className="lg:mr-20">{translation?.dict?.footer?.contacts}</p>
            <div className="flex space-x-5">
              <Link target="_blank" href="https://twitter.com">
                <Icons.Twitter className="w-8 h-8 text-gray-400 dark:text-gray-200" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/nikos-theodoropoulos-30/"
              >
                <Icons.Linkedin className="w-8 h-8 text-gray-400 dark:text-gray-200" />
              </Link>
              <Link target="_blank" href="https://www.instagram.com/">
                <Icons.Instagram className="w-8 h-8 text-gray-400 dark:text-gray-200" />
              </Link>
              <Link target="_blank" href="https://www.youtube.com/">
                <Icons.Youtube className="w-8 h-8 text-gray-400 dark:text-gray-200" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex-1 max-w-lg">
            <form className="flex space-x-3">
              <input
                placeholder={translation?.dict?.footer?.email}
                className="input"
                type="email"
              />
              <button
              type="submit"
              className="px-2 text-white bg-gray-200 dark:bg-gray-600 rounded-md whitespace-nowrap"
              >
                {translation?.dict?.footer?.submit}
              </button>
            </form>
          </div>
        </div>

        {/* info */}
        <div className="space-y-6 lg:flex lg:justify-between">
          <div className="space-y-3 lg:max-w-2xl">
            <h5 className="font-semibold text-foreground">
              {translation?.dict?.constants?.name} {translation?.dict?.footer?.description}
            </h5>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              {translation?.dict?.footer?.secure} {translation?.dict?.constants?.name}{' '}
              {translation?.dict?.footer?.customers}
            </p>
          </div>

          <div className="flex justify-center gap-x-2"></div>
        </div>
      </div>

      <div className="flex items-center justify-center py-3 mt-6 bg-gray-600 space-x-3">
        <ResponsiveImage
          dimensions="h-16 w-16"
          className="overflow-hidden border-4 border-red-600 rounded-full"
          src="/developer.jpeg"
          sizes="4rem"
          alt={translation?.dict?.footer?.nikos || 'dev'}
        />
        <p className="text-white">
          <a href="/" target="_blank" className="text-sky-400">
            {translation?.dict?.footer?.nikos}
          </a>{' '}
          {translation?.dict?.footer?.developer}
        </p>
      </div>
    </footer>
  )
}

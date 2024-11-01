'use client'

import { DashboardAside } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle } from '@/hooks'
import Image from 'next/image'

const AdminPage = () => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.constants ? `${dict.constants?.name} - ${dict.constants?.admin}` : 'Admin Center')

  return (
    <>
      <div className="lg:hidden">
        <DashboardAside />
      </div>
      <section className="hidden py-20 lg:block">
        <Image
          src="/icons/chart.png"
          alt={dict.admin?.charts || ''}
          width={208}
          height={208}
          priority
          className="mx-auto mb-8"
        />

        <p className="text-center">{dict.admin?.analytics}</p>
        <span className="block my-3 text-base text-center text-amber-500">
          ({dict.admin?.development})
        </span>
      </section>
    </>
  )
}

export default AdminPage

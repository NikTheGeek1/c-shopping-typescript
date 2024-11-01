'use client'

import { DashboardAside } from '@/components'
import { useTitle } from '@/hooks'
import { siteTitle } from '@/utils'
import Image from 'next/image'

const AdminPage = () => {
  useTitle(`${siteTitle} - Admin Center`)
  return (
    <>
      <div className="lg:hidden">
        <DashboardAside />
      </div>
      <section className="hidden py-20 lg:block">
        <Image
          src="/icons/chart.png"
          alt="Chart"
          width={208}
          height={208}
          className="mx-auto mb-8"
        />

        <p className="text-center">Situation Analysis</p>
        <span className="block my-3 text-base text-center text-amber-500">(In Development)</span>
      </section>
    </>
  )
}

export default AdminPage

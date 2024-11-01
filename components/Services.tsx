import { CashOnDelivery, Daysreturn, ExpressDelivery, OriginalProducts, Support } from '@/components'

export default function Services() {
  const services = [
    {
      name: 'Possibility of Express Delivery',
      icon: <ExpressDelivery className="w-10 h-10" />,
    },
    { name: '24/7 Support', icon: <Support className="w-10 h-10" /> },
    {
      name: 'Cash on Delivery Available',
      icon: <CashOnDelivery className="w-10 h-10" />,
    },
    {
      name: 'Seven Days Return Guarantee',
      icon: <Daysreturn className="w-10 h-10" />,
    },
    {
      name: 'Guaranteed Original Products',
      icon: <OriginalProducts className="w-10 h-10" />,
    },
  ]

  //? Render(s)
  return (
    <section className="hidden py-5 border-t border-b-2 border-gray-200 lg:flex justify-evenly">
      {services.map((item, i) => (
        <div key={i} className="flex items-center gap-x-1">
          {item.icon}
          <span className="text-xs">{item.name}</span>
        </div>
      ))}
    </section>
  )
}

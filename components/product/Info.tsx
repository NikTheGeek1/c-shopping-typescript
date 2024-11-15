interface InfoProps {
  infos: { title: string; value: string }[]
}

const Info = ({ infos }: InfoProps) => {

  //? Render(s)
  return (
    <section className="px-4 pb-2">
      <h4 className="my-3 lg:mt-6">Attributes</h4>
      <ul className="ml-6 space-y-2 list-disc">
        {infos.map((item, i) => {
          if (!item.title || !item.value) return;
          return (
          <li key={i} className="tracking-wide text-gray-500 dark:text-gray-400">
            <span className="ml-2 font-light">{item.title} :</span>
            <span className="text-gray-900">{item.value}</span>
          </li>
        )})}
      </ul>
    </section>
  )
}

export default Info

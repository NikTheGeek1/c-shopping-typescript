import { Icons } from '@/components'

import { useRouter } from 'next/navigation'

interface IconButtonProps {
  title: string
  icon: React.ReactNode
  children?: React.ReactNode
  onClick?: () => void
}

const IconButton = ({title, icon, children, ...restPorps}: IconButtonProps) => {

  //? Render(s)
  return (
    <button type="button" title={title} className="mx-3 my-2" {...restPorps}>
      {icon}
      {children}
    </button>
  )
}

interface IconBtnProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export const BackIconBtn = ({ className, ...props }: IconBtnProps) => {
  //? Assets
  const { back } = useRouter()

  //? Render(s)
  return (
    <IconButton
      title="Back"
      icon={
        <Icons.ArrowLeft className="text-gray-500 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95 bg-gray-50" />
      }
      onClick={() => back()}
      {...props}
    />
  )
}

export const EditIconBtn = ({ ...props }: IconBtnProps) => (
  <IconButton
    title="Edit"
    icon={
      <Icons.Edit className="rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95 text-amber-500 bg-amber-100" />
    }
    {...props}
  />
)

export const DeleteIconBtn = ({ ...props }: IconBtnProps) => (
  <IconButton
    title="Delete"
    icon={
      <Icons.Delete className="text-red-500 bg-red-100 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95" />
    }
    {...props}
  />
)

export const AddIconBtn = ({ ...props }: IconBtnProps) => (
  <IconButton
    title="Add"
    icon={
      <Icons.Plus className="text-green-500 bg-green-100 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 active:scale-95" />
    }
    {...props}
  />
)

export const AddToListIconBtn = ({ ...props }: IconBtnProps) => (
  <AddIconBtn className="border-2 border-green-100 rounded-full flex-center gap-x-4" {...props}>
    <span className="pl-2 text-base text-green-500">Add to List</span>
  </AddIconBtn>
)

export const DeleteFromListIconBtn = ({ ...props }: IconBtnProps) => (
  <DeleteIconBtn className="border-2 border-red-100 rounded-full flex-center gap-x-4" {...props}>
    <span className="pl-2 text-base text-red-500">Remove from List</span>
  </DeleteIconBtn>
)

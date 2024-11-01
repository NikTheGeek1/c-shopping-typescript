import { Loading } from '@/components'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  children: React.ReactNode
  className?: string
  isRounded?: boolean
  onClick?: () => void
}

export const Button = ({ type, isLoading, children, className, isRounded, ...restPropps }: ButtonProps) => {

  //? Render
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`button ${isRounded ? 'rounded-3xl' : ''} ${className}
      `}
      {...restPropps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  )
}

interface BtnProps {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

export const LoginBtn = ({ children, ...restPropps }: BtnProps) => (
  <Button type="submit" className="mx-auto rounded-3xl w-44" {...restPropps}>
    {children}
  </Button>
)

interface SubmitBtnProps {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

export const SubmitModalBtn = ({ children, ...restPropps }: SubmitBtnProps) => (
  <Button
    type="submit"
    className="w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0"
    {...restPropps}
  >
    {children}
  </Button>
)

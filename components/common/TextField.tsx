import { DisplayError } from '@/components'
import { useController } from 'react-hook-form'

interface TextFieldProps {
  label?: string
  errors?: any
  name: string
  type?: string
  control: any
  direction?: string
  [key: string]: any
}

export default function TextField({ label, errors, name, type = 'text', control, direction, ...inputProps }: TextFieldProps) {

  //? Form Hook
  const { field } = useController({ name, control, rules: { required: true } })

  //? Handlers
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (type === 'number' && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue))
    } else {
      field.onChange(inputValue)
    }
  }

  //? Render(s)
  return (
    <div>
      {label && (
        <label className="block text-xs text-gray-700 dark:text-gray-200 lg:text-sm md:min-w-max mb-3" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        style={{ direction: `${direction === 'ltr' ? 'ltr' : 'unset'}` }}
        className="block w-full px-3 py-1.5 text-base transition-colors border border-gray-200 dark:border-gray-700 rounded-md outline-none bg-zinc-50/30 lg:text-lg focus:border-blue-600"
        id={name}
        type={type}
        value={field?.value ?? ''}
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChangeHandler}
        ref={field.ref}
        {...inputProps}
      />

      <DisplayError errors={errors} />
    </div>
  )
}

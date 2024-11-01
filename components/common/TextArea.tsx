import { Control, FieldError, useController } from 'react-hook-form'

import { DisplayError } from '@/components'

interface TextAreaProps {
  name: string
  control: Control
  label?: string
  errors?: FieldError | undefined
  [key: string]: any
}

const TextArea = ({ name, control, label, errors, ...restProps }: TextAreaProps) => {

  //? Form Hook
  const { field } = useController({ name, control, rules: { required: true } })

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          className="block text-xs text-gray-700 lg:text-sm md:min-w-max mb-3"
          htmlFor={field.name}
        >
          {label}
        </label>
      )}
      <textarea
        cols={30}
        rows={4}
        className="input"
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        id={name}
        {...restProps}
      />
      <DisplayError errors={errors} />
    </div>
  )
}

export default TextArea

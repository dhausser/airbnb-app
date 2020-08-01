interface FormProps {
  name: string
  label: string
  type: string
  autoComplete: string
  required: boolean
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Field({
  name,
  label,
  type,
  autoComplete,
  required,
  value,
  onChange,
}: FormProps): JSX.Element {
  return (
    <div>
      <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
        {label} {required ? <span title="Required">*</span> : undefined}
      </label>
      <br />
      <input
        autoComplete={autoComplete}
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

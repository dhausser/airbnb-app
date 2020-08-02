import { useState, ChangeEvent } from 'react'

type Inputs = Record<string, string | undefined>
type Event = ChangeEvent<HTMLInputElement>
type Form = {
  inputs: Inputs
  handleChange: (event: Event) => void
  resetForm: () => void
  clearForm: () => void
}

export default function useForm(initial = {}): Form {
  const [inputs, setInputs] = useState(initial)

  function handleChange(event: Event) {
    const { name, value } = event.target
    setInputs({ ...inputs, [name]: value })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, '']))
    setInputs(blankState)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}

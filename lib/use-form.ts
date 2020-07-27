import { useState, SyntheticEvent } from 'react'

interface Form {
  inputs: any
  handleChange: (event: SyntheticEvent) => void
  resetForm: () => void
  clearForm: () => void
}

export default function useForm(initial = {}): Form {
  const [inputs, setInputs] = useState(initial)

  function handleChange(event) {
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

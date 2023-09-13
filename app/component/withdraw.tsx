import { useEffect, useState } from "react"

interface withdrawFormProps {
    htmlFor: string
    label: string
    type?: string
    value: any,
    onChange?: (...args: any) => any,
    error?: string
}
export function WithdrawForm({
    htmlFor,
    label,
    type = 'number',
    value,
    onChange = () => { },
    error = ""
}: withdrawFormProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])

    return <>

        <label htmlFor={htmlFor} className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">{label}</span></label>
        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }}
            type={type} value={value} name={htmlFor} id={htmlFor} className="p-3 block w-full border-transparent rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400" placeholder={label} />

    </>
}
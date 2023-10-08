import { useEffect, useState } from "react"

interface withdrawFormProps {
    htmlFor: string
    label: string
    type?: string
    value?: any,
    onChange?: (...args: any) => any,
    error?: string
}
export function TransferForm({
    htmlFor,
    label,
    type,
    value,
    onChange = () => { },
    error = ""
}: withdrawFormProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])
    return <>
        <label htmlFor={htmlFor} className="block text-sm font-medium dark:text-white"><span className="sr-only">{label}</span></label>
        <input type={type} value={value} name={htmlFor} id={htmlFor} className="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-transparent dark:text-gray-400" placeholder={label} />
    </>
}
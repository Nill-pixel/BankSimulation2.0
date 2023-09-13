import { useState, useEffect } from "react";

interface FormFieldProps {
    htmlFor: string,
    label: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string
}

export function FormField({
    htmlFor,
    label,
    type = 'text',
    value,
    onChange = () => { },
    error = ""
}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])

    return <>
        <label htmlFor={htmlFor} className="pointer-events-none absolute left-6 top-1/4    -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950">{label}</label>
        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }} type={type} id={htmlFor} name={htmlFor} className="peer block w-full  border-b-2  bg-transparent px-3 pb-2 pt-8 text-base/2 text-neutral-950 dark:text-neutral-100  transition focus:border-blue-400 focus:outline-none focus:ring-green-400/5 " value={value} />
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {errorText || ''}
        </div>
    </>
}
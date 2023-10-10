import { Layout } from "~/component/layout";
import { FormField } from "~/component/formField";
import { useEffect, useRef, useState } from "react";
import { json, type ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { validateEmail, validateName, validatePassword } from "~/utils/validators.server";
import { useActionData } from "@remix-run/react";
import { getClient, login, register } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await getClient(request) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get("_action")
    const email = form.get("email")
    const password = form.get("password")
    let firstName = form.get("firstName")
    let lastName = form.get("lastName")
    let bi = form.get("bi")

    if (
        typeof action !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"

    ) {
        return json({ error: `Invalid form data`, form: action }, { status: 403 })
    }

    if (
        action === "register" && (
            typeof firstName !== "string" ||
            typeof lastName !== "string" ||
            typeof bi !== "string"
        )
    ) {
        return json({ error: `Invalid form data`, form: action }, { status: 402 })
    }

    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(action === 'register' ? {
            bi: validateName(bi as string || ''),
            firstName: validateName(firstName as string || ''),
            lastName: validateName(lastName as string || '')
        } : {})


    }
    if (Object.values(errors).some(Boolean))
        return json({ errors, fields: { email, password, firstName, lastName, bi }, form: action }, { status: 401 })

    switch (action) {
        case "login": {
            return await login({ email, password })
        }
        case "register": {
            firstName = firstName as string
            lastName = lastName as string
            bi = bi as string
            return await register({ email, password, firstName, lastName, bi })
        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 })

    }

}

export default function Login() {
    const actionData = useActionData();

    const [formError, setFormError] = useState(actionData?.error || '');
    const [errors, setErrors] = useState(actionData?.errors || {});
    const [action, setAction] = useState('login');
    const firstLoad = useRef(true);

    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || '',
        password: actionData?.fields?.password || '',
        firstName: actionData?.fields?.firstName || '',
        lastName: actionData?.fields?.lastName || '',
        bi: actionData?.fields?.bi || ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: event.target.value
        }));
    };

    useEffect(() => {
        if (!firstLoad.current) {
            const newState = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                bi: ''
            };

            setErrors(newState);
            setFormError('');
            setFormData(newState);
        }
    }, [action]);

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('');
        }
    }, [formData]);

    useEffect(() => {
        firstLoad.current = false;
    }, []);

    // O restante do componente continua...

    return (
        <Layout>
            <div className={action === 'login' ? 'flex h-screen text-2xl justify-center items-center flex-col gap-y-4 gap-x-4' : 'flex p-5 text-2xl justify-center items-center bg-gradient-to-br flex-col gap-y-4 gap-x-4'}>
                <button
                    onClick={() => setAction(action === 'login' ? 'register' : 'login')}
                    className="absolute top-8 right-8">
                    <a href="#_" className="relative px-5 py-2 font-medium text-white group">
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-blue-500 group-hover:bg-blue-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-blue-700 group-hover:bg-blue-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-blue-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-blue-400 -rotate-12"></span>
                        <span className="relative">{action === 'login' ? 'Sign Up' : 'Sign In'}</span>
                    </a>
                </button>
                <h2 className="tex-2xl font-extrabold text-blue-300">MT-BANK</h2>
                <form method="post" className={action === 'login' ? 'rounded-md border-gray-300 shadow-md border p-6 w-96' : 'rounded-md border-gray-300 shadow-md border p-6 w-1/2'}>
                    <p className="font-semibold text-slate-500 text-center text-sm ">
                        {action === 'login' ? 'Securely access your account and take control of your finances.' : 'Join our financial family and embark on a journey of smart money '}
                    </p>
                    <div className=" text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                        {formError}
                    </div>
                    <div className={action === 'login' ? '' : ''}>
                        <div className="group relative z-0 transition-all m-2 focus-within:z-10">
                            <FormField
                                htmlFor="email"
                                label="Email"
                                value={formData.email}
                                error={errors?.email}
                                onChange={e => handleInputChange(e, 'email')}></FormField>
                        </div>
                        <div className="group relative z-0 transition-all m-2 focus-within:z-10">
                            <FormField
                                htmlFor="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                error={errors?.password}
                                onChange={e => handleInputChange(e, 'password')}
                            ></FormField></div>
                        {
                            action !== 'login' ? <>
                                <div className="group relative z-0 transition-all m-2 focus-within:z-10">
                                    <FormField
                                        htmlFor="firstName"
                                        label="First Name"
                                        type="text"
                                        value={formData.firstName}
                                        error={errors?.firstName}
                                        onChange={e => handleInputChange(e, 'firstName')}
                                    />
                                </div>
                                <div className="group relative z-0 transition-all m-2 focus-within:z-10">
                                    <FormField
                                        htmlFor="lastName"
                                        label="Last Name"
                                        type="text"
                                        value={formData.lastName}
                                        error={errors?.lastName}
                                        onChange={e => handleInputChange(e, 'lastName')}
                                    />
                                </div>
                                <div className="group relative z-0 transition-all m-2 focus-within:z-10">
                                    <FormField
                                        htmlFor="bi"
                                        label="BI"
                                        type="text"
                                        value={formData.bi}
                                        error={errors?.bi}
                                        onChange={e => handleInputChange(e, 'bi')}
                                    />
                                </div>

                            </> : null
                        }
                    </div>

                    <div className="w-full text-center mt-8 mb-8">
                        <button type="submit" name="_action" value={action}>
                            <a href="#_" className="rounded px-5 py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative"> {action === 'login' ? 'Sign In' : 'Sign Up'}</span>
                            </a>
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
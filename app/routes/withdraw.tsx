import { Account } from "@prisma/client";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import Card from "~/component/card";
import { Layout } from "~/component/layout";
import Menu from "~/component/menu";
import MenuProfile from "~/component/menu-profile";
import { Profiles } from "~/component/profile";
import { WithdrawForm } from "~/component/withdraw";
import { debit, getAccount } from "~/utils/account.server";
import { getClient, requireClientId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    const client = await getClient(request)
    const clientId = await requireClientId(request)
    const clientAccount = await getAccount(clientId)
    return json({ client, clientAccount })
}

export const action: ActionFunction = async ({ request }) => {

    const form = await request.formData()
    const action = form.get('_action')
    const balance = form.get('balance')
    const clientId = await requireClientId(request)
    const clientAccount = await getAccount(clientId)

    if (typeof action !== 'string' || typeof balance !== 'string') {
        return json({ error: `Invalid form data`, form: action }, { status: 403 })
    }

    switch (action) {
        case 'withdraw': {
            const balanceValue = parseFloat(balance)
            let account: Account = {
                id: clientAccount?.id,
                accountNumber: clientAccount?.accountNumber,
                balance: clientAccount?.balance,
                clientId: clientAccount?.clientId,
                iban: clientAccount?.iban
            } as Account

            return await debit(account, balanceValue)
        }
        default: {
            return json({ error: `Invalid form data`, form: action }, { status: 403 })
        }
    }
}

export default function Withdraw() {
    const { client, clientAccount } = useLoaderData()
    const actionData = useActionData();
    const [formData, setFormData] = useState({
        balance: actionData?.fields?.balance || ''
    })
    const [action] = useState('withdraw')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: event.target.value
        }))
    }
    return (
        <Layout>
            <Menu><MenuProfile profile={client.profile} /></Menu>
            <Card> <Profiles account={clientAccount} profile={client.profile} />

                <div className="relative overflow-hidden col-span-2">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
                                Withdraw
                            </h1>

                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Security, efficiency, and trust: our banking system is here to make accessing your money fast and worry-free.
                            </p>

                            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">

                                <form method="post">
                                    <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                                        <div className="flex-[1_0_0%]">
                                            <WithdrawForm
                                                htmlFor="balance"
                                                label="Balance"
                                                value={formData.balance}
                                                onChange={e => handleInputChange(e, 'balance')}

                                            />
                                        </div>
                                        <div className="flex-[0_0_auto]">
                                            <button type="submit" name="_action" value={action}>
                                                <a className="p-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className="hidden md:block absolute top-0 right-0 -translate-y-12 translate-x-20">
                                    <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                        <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                        <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                    </svg>
                                </div>

                                <div className="hidden md:block absolute bottom-0 left-0 translate-y-10 -translate-x-32">
                                    <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    )
}
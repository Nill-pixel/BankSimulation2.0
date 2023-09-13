import { Account, Profile } from "@prisma/client"

interface props {
    profile: Profile
    account: Account
}
export function Profiles({ profile, account }: props) {

    return (
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 md:p-6">
                <div className="flex flex-col rounded-xl p-4 md:p-6 bg-slate-300 border-gray-500 dark:bg-slate-800 dark:border-gray-800">
                    <div className="flex items-center gap-x-4">
                        <img className="rounded-full w-20 h-20" src="https://i.pinimg.com/originals/f3/c1/4b/f3c14b4d0b9bd7dd50ccb68e47c9cefc.jpg" alt="Image Description" />
                        <div className="grow">
                            <h3 className="font-medium text-gray-800 dark:text-gray-700">
                                {profile.firstName}
                            </h3>
                            <p className="text-xs uppercase text-gray-500">
                                {profile.lastName}
                            </p>
                        </div>
                    </div>
                    <div className="m-3">
                        <ul className="space-y-3 text-sm">
                            <li className="flex space-x-3">
                                <svg className="flex-shrink-0 h-6 w-6 text-blue-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z" fill="currentColor" fillOpacity="0.1" />
                                    <path d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z" fill="currentColor" />
                                </svg>
                                <span className="text-gray-800 dark:text-gray-400">
                                    Balance <p>{account.balance} kz</p>
                                </span>
                            </li>

                            <li className="flex space-x-3">
                                <svg className="flex-shrink-0 h-6 w-6 text-blue-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z" fill="currentColor" fillOpacity="0.1" />
                                    <path d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z" fill="currentColor" />
                                </svg>
                                <span className="text-gray-800 dark:text-gray-400">
                                    Nº Account: <p>{account.accountNumber}</p>
                                </span>
                            </li>

                            <li className="flex space-x-3">
                                <svg className="flex-shrink-0 h-6 w-6 text-blue-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z" fill="currentColor" fillOpacity="0.1" />
                                    <path d="M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z" fill="currentColor" />
                                </svg>
                                <span className="text-gray-800  dark:text-gray-400">
                                    IBAN <p>{account.iban}</p>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from "react"
export function Layout({ children }: { children: React.ReactNode }) {
    return <div className="text-xl bg-gradient-to-br h-screen dark:bg-gray-900 border-b-2 border-white sm:justify-center space-x-4">
        {children}
    </div>
}
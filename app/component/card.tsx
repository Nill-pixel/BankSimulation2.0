export default function Card({ children }: { children: React.ReactNode }) {
    return <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
}
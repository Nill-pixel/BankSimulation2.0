import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/component/card";
import { Layout } from "~/component/layout";
import Menu from "~/component/menu";
import MenuProfile from "~/component/menu-profile";
import { Profiles } from "~/component/profile";
import { getAccount } from "~/utils/account.server";
import { getClient, requireClientId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    const client = await getClient(request)
    const clientId = await requireClientId(request)
    const clientAccount = await getAccount(clientId)
    return json({ client, clientAccount })
}

export default function Home() {
    const { client, clientAccount } = useLoaderData()
    return (
        <Layout>
            <Menu><MenuProfile profile={client.profile} /></Menu>
            <Card> <Profiles account={clientAccount} profile={client.profile} /></Card>
        </Layout>
    )
}
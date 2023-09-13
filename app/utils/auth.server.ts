import { LoginForm, RegisterForm } from "./type.server"
import { createCookieSessionStorage, json } from "@remix-run/node"
import { createClient } from "./client.server"
import bcrypt from 'bcryptjs'
import { redirect } from "react-router"
import { createAccount } from "./account.server"
import { prisma } from "./db.server"


const secret = process.env.SESSION_SECRET;
if (!secret) {
    throw new Error("SESSION_SECRET must be set")
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'bank-session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [secret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true
    }
})

export const register = async (form: RegisterForm) => {
    const exist = await prisma.client.count({ where: { email: form.email } })

    if (exist) {
        return json(
            { error: `Client already exists with that email` },
            { status: 400 }
        )
    }

    const newClient = await createClient(form)

    if (!newClient) {
        return json(
            {
                error: `Somithing went wrong trying to create a new user`,
                fields: { email: form.email, password: form.password }
            },
            {
                status: 400
            }
        )
    }
    await createAccount(newClient.id)
    return createClientSession(newClient.id, '/')
}


export const login = async (form: LoginForm) => {
    const client = await prisma.client.findUnique({
        where: { email: form.email }
    })

    if (!client || !(await bcrypt.compare(form.password, client.password))) {
        return json({ error: `Incorrect login` }, { status: 400 })
    }

    return createClientSession(client.id, '/')
}


export const createClientSession = async (
    clientId: string,
    redirectTo: string
) => {
    const session = await storage.getSession()
    session.set('clientId', clientId)

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    })
}

export async function requireClientId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getClientSession(request)
    const clientId = session.get('clientId')
    if (!clientId || typeof clientId !== "string") {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
        throw redirect(`/login?${searchParams}`)
    }
    return clientId
}

function getClientSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"))
}

async function getClientId(request: Request) {
    const session = await getClientSession(request)
    const clientId = session.get("clientId")
    if (!clientId || typeof clientId !== 'string') return null
    return clientId
}

export async function getClient(request: Request) {
    const clientId = await getClientId(request)
    if (typeof clientId !== 'string') {
        return null
    }

    try {
        const client = await prisma.client.findUnique({
            where: { id: clientId },
            select: { id: true, email: true, profile: true }
        })
        return client
    } catch {
        throw logout(request)
    }

}

export async function logout(request: Request) {
    const session = await getClientSession(request)
    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    })

}
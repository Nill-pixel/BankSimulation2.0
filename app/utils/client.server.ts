import { prisma } from "./db.server";
import { RegisterForm } from "./type.server";
import bcrypt from 'bcryptjs';

export const createClient = async (client: RegisterForm) => {
    const passwordHas = await bcrypt.hash(client.password, 10)
    const newClient = await prisma.client.create({
        data: {
            email: client.email,
            password: passwordHas,
            bi: client.bi,
            profile: {
                firstName: client.firstName,
                lastName: client.lastName
            }

        }
    })
    return { id: newClient.id, email: client.email }
}
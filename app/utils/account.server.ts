import { prisma } from "./db.server"
import * as iban from 'iban';

export const createAccount = async (clientId: string) => {
    const { iban, accountNumber } = generateIBANAndAccountNumber();
    const newAccount = await prisma.account.create({
        data: {
            clientId: clientId,
            balance: 20000,
            iban: iban,
            accountNumber: accountNumber
        }
    })
    return { newAccount }
}

export const getAccount = async (clientId: string) => {
    return await prisma.account.findFirst({
        where: { clientId: clientId }
    })
}

export function generateIBANAndAccountNumber(): { iban: string, accountNumber: number } {
    const country = 'AO';
    const bankCode = Math.floor(Math.random() * 99999999999999);
    const accountNumber = Math.floor(Math.random() * 9999999);
    const ibanNumber = iban.fromBBAN(country, bankCode.toString() + accountNumber);
    return { iban: ibanNumber, accountNumber: accountNumber }
}


export const withdraw = async (balance: number, accountId: string) => {
    await prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            balance: balance
        }
    })
}

import { Account } from "@prisma/client";
import { prisma } from "./db.server"
import * as iban from 'iban';
import { json } from "@remix-run/node";
interface props {
    account: Account
}

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

export const getAccountByIBAN = async (clientIban: string) => {
    return await prisma.account.findFirst({
        where: { iban: clientIban }
    })
}

export function generateIBANAndAccountNumber(): { iban: string, accountNumber: number } {
    const country = 'AO';
    const bankCode = Math.floor(Math.random() * 99999999999999);
    const accountNumber = Math.floor(Math.random() * 9999999);
    const ibanNumber = iban.fromBBAN(country, bankCode.toString() + accountNumber);
    return { iban: ibanNumber, accountNumber: accountNumber }
}


/*export const withdraw = async ({ account }: props, balance: number) => {
    const accountId = account.id
    let balanceValue = account.balance;
    balanceValue =- balance
    return await prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            balance: balanceValue
        }
    })
}
*/
export const updateBalance = async (balance: number, accountId: string) => {
    return await prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            balance: balance
        }
    })
}


export function debit(account: Account, balance: number) {

    if (account.balance > balance) {
        account.balance -= balance
        return updateBalance(account.balance, account.id)
    } else {
        console.log("error")
        return json({ error: `Invalid form data` }, { status: 403 })
    }
}

export function deposit(account: Account, balance: number) {
    account.balance += balance
    return updateBalance(account.balance, account.id)
}

export function transfer(account: Account, targetAccount: Account, balance: number) {
    debit(account, balance)
    return deposit(targetAccount, balance)
}

export const getTargetClient = async (clientId: string) => {
    return await prisma.client.findFirst({
        where: { id: clientId }
    })

}
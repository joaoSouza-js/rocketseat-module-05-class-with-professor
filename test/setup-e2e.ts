import { PrismaPg } from "@prisma/adapter-pg"
import { randomUUID } from "crypto"
import "dotenv/config"
import { execSync } from "node:child_process"
import { PrismaClient } from "../src/generated/prisma/client"



function generateUniqueDataBaseUrl(schemaId: string) {

    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not defined")
    }

    const dbUrl = new URL(databaseUrl)
    dbUrl.searchParams.set("schema", schemaId)
    return dbUrl.href
}


let prismaClient: PrismaClient

beforeAll(async () => {
    const schemaId = randomUUID()
    const databaseUrl = generateUniqueDataBaseUrl(schemaId)
    process.env.DATABASE_URL = databaseUrl
    process.env.SCHEMA_ID = schemaId

    console.log('SCHEMA_ID', schemaId)


    const adapter = new PrismaPg({
        connectionString: databaseUrl
    })
    prismaClient = new PrismaClient({
        adapter: adapter,
        log: ["error", "warn"],
    })

    execSync('npx prisma migrate deploy')

})

afterAll(async () => {
    await prismaClient.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${process.env.SCHEMA_ID}" CASCADE`)
    await prismaClient.$disconnect()
})


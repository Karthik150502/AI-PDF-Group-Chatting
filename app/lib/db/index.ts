
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'








// if (!process.env.POSTGRES_NEON_URI) {
//     throw new Error('POSTGRES_NEON_URI is not set/ not configured in the .env file.')
// }

const sql = neon("postgresql://PDFAI_owner:ScMGL4qNWs9e@ep-aged-mountain-a1f87jqf.ap-southeast-1.aws.neon.tech/PDFAI?sslmode=require")
// const sql = neon(process.env.POSTGRES_NEON_URI!)

export const db = drizzle(sql)


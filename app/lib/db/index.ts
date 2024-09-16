
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'








// if (!process.env.POSTGRES_NEON_URI) {
//     throw new Error('POSTGRES_NEON_URI is not set/ not configured in the .env file.')
// }

const sql = neon(process.env.POSTGRES_NEON_URI!)

export const db = drizzle(sql)


import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv"




dotenv.config({ path: ".env.local" });




export default {
    dialect: "postgresql",
    schema: './app/lib/db/schema.ts',
    dbCredentials: {
        url: process.env.POSTGRES_NEON_URI!,
    },
} satisfies Config
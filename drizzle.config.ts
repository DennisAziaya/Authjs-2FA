import * as dotenv from "dotenv";

import { defineConfig } from "drizzle-kit";

dotenv.config(
    {
        path : ".env.local"
    }
);


export default defineConfig({
    dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url: process.env.DRIZZLE_DATABASE_URL!,
    },
    out: "./drizzle",
});


// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//     schema: "./src/schema.ts",
//     out: "./drizzle",
//     dialect: "postgresql",
//     dbCredentials: {
//         user: "postgres",
//         password: process.env.DATABASE_PASSWORD,
//         host: "127.0.0.1",
//         port: 5432,
//         database: "db",
//     }
// });
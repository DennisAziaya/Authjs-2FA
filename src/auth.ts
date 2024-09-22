import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import db from "@/db/drizzle";
import {users} from "@/db/schemas/userSchema";
import {eq} from "drizzle-orm";
import {compare} from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks : {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}) {
            session.user.id = token.id as string;
            return session;
        }
    },
    providers: [
        Credentials(
            {
                // id: "credentials",
                // name: "Credentials",
                credentials: {
                    email: {},
                    password: {},
                },
                async authorize(credentials) {
                    const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string));

                    if(!user) {
                        throw new Error("Incorrect email or password");
                    } else {
                        const passwordCorrect = await compare(credentials.password as string, user.password!);
                        if (!passwordCorrect) {
                            throw new Error("Incorrect email or password");
                        }

                        return {
                            id : user.id.toString(),
                            email : user.email,
                        };
                    }

                    // return user
                },
            }
        )
    ],
})
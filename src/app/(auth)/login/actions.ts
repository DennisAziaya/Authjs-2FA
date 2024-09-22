"use server"

import {z} from "zod";
import {hash} from "bcryptjs";
import db from "@/db/drizzle";
import {users} from "@/db/schemas/userSchema";
import {signIn, signOut} from "@/auth";

export const loginUserWithCredentials = async ({email, password}: {
    email: string;
    password: string;
}) => {

    const loginUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(1, {
            message: "Password field is required",
        })
    });

    const loginValidation = loginUserSchema.safeParse({email, password});

    if(!loginValidation.success) {
        // throw new Error(newUserValidator.error.errors[0].message || "Failed to register user");
        return {
            error: true,
            message: loginValidation.error?.issues[0]?.message || "Failed to login user"
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        } catch (e : any) {
            return {
                error: true,
                message: "Incorrect email or password"
            }
        }
}


export const logOutUser = async () => {
    await signOut();
}
"use server"

import {z} from "zod";
import {hash} from "bcryptjs";
import db from "@/db/drizzle";
import {users} from "@/db/schemas/userSchema";

export const registerUser = async ({email, password, confirmPassword}: {
    email: string;
    password: string;
    confirmPassword: string;
}) => {
    // const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password, confirmPassword }),
    // });
    //
    // if (!response.ok) {
    //     throw new Error('Failed to register user');
    // }
    //
    // return response.json();

    try {
        const newUserSchema = z.object({
            email: z.string().email(),
            password: z.string().min(8, {
                message: "Password must be at least 8 characters",
            }),
            confirmPassword: z.string().min(8, {
                message: "Password must be at least 8 characters",
            }),
        }).refine(data => data.password === data.confirmPassword, {
                message: "Passwords must match",
            }
        );

        const newUserValidator = newUserSchema.safeParse({email, password, confirmPassword});

        if(!newUserValidator.success) {
            // throw new Error(newUserValidator.error.errors[0].message || "Failed to register user");
            return {
                error: true,
                message: newUserValidator.error.errors[0].message || "Failed to register user"
            }
        }

        const hashedPassword = await hash(password, 10);

        await db.insert(users).values(
            {
                email,
                password: hashedPassword,
            }
        );

    } catch (error : any) {
        // console.log("Errorrrr", error)
        if (error.code === "23505") {
            return {
                error: true,
                message: "An account with that email already exists"
            }
        }

        return {
            error: true,
            message: "An error occurred while registering the user"
        }
    }
}
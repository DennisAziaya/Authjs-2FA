"use client";

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterFormSchema} from "@/utils/validations";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";
import Link from "next/link";
import {registerUser} from "@/app/(auth)/register/actions";


const RegisterForm = () => {


    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })



    const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {

            const response = await registerUser({
                email : data.email, password: data.password, confirmPassword: data.confirmPassword
            })

            if(response?.error) {
                form.setError("email", {
                    message: response?.message
                })
                toast({
                    title: "Error",
                    description:<div className={'bg-red-500 text-white p-4'}>{response?.message}</div>
                })
            } else {
                toast({
                    title: "Success",
                    description: <div className={"bg-green-500 text-white"}>User registered successfully</div>
                })
            }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            {
                form.formState.isSubmitSuccessful ?
                    <Card className="w-[90%] md:w-[80%] lg:w-1/3">
                        <CardHeader>
                            <CardTitle>Account has been created successfully</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant={'outline'} >
                                <Link href={'/login'}>Login to your account</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    :
            <Card className="w-[90%] md:w-[80%] lg:w-1/3">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register for an account using the form below </CardDescription>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <fieldset disabled={form.formState.isSubmitting} className={'flex flex-col space-y-4'}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type={'email'} placeholder="Email Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={'password'} placeholder="Your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input type={'password'} placeholder="Confirm your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button disabled={form.formState.isSubmitting} variant={'outline'} className={'w-full md:w-1/3 '} type="submit">
                                    {form.formState.isSubmitting ? <Loader2 className={'w-4 h-4 animate-spin'} /> : "Submit"}
                                </Button>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            }
        </div>
    )
}


export default RegisterForm
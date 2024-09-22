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
import {LoginFormSchema} from "@/utils/validations";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {loginUserWithCredentials} from "@/app/(auth)/login/actions";


const LoginForm = () => {

    const route = useRouter();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })



    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {

            const response = await loginUserWithCredentials({
                email : data.email, password: data.password
            })

            if(response?.error) {
                form.setError("root", {
                    message: response?.message
                })
                toast({
                    title: "Error",
                    description:<div className={'bg-red-500 text-white p-4'}>{response?.message}</div>
                })
            } else {
                route.push("/dashboard")
                toast({
                    title: "Success",
                    description: <div className={"bg-green-500 text-white"}>User Logged in successfully</div>
                })
            }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[90%] md:w-[80%] lg:w-1/3">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login into your account using the form below </CardDescription>
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

                                {
                                    !!form.formState.errors.root && (
                                        <FormMessage>
                                            {form.formState.errors.root.message}
                                        </FormMessage>
                                    )
                                }
                                <Button disabled={form.formState.isSubmitting} variant={'outline'} className={'w-full md:w-1/3 '} type="submit">
                                    {form.formState.isSubmitting ? <Loader2 className={'w-4 h-4 animate-spin'} /> : "Login"}
                                </Button>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


export default LoginForm
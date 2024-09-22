'use client';
import React from 'react';
import LogOutButton from "@/app/(auth)/login/_components/LogOutButton";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">User is signed in</h1>
                <LogOutButton/>
            </header>
            <main className="flex-grow w-full flex items-center justify-center">
                <p className="text-gray-600">Welcome to your dashboard!</p>
            </main>
        </div>
    );
}


export default Page;
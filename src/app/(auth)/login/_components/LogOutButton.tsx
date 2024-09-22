"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import {logOutUser} from "@/app/(auth)/login/actions";

const LogOutButton = () => {
    return (
        <Button onClick={
            async () => {
                await logOutUser()
            }
        } className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
        </Button>
    );
};

export default LogOutButton;
"use client";

import AuthForm from "@/components/authform";

export default function SignUp(){
    return <section className="w-full flex h-screen justify-center items-center">
        <AuthForm origin="signup" />
    </section>
}
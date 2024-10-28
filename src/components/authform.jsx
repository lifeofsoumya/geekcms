import { Icons } from "@/components/Icons";
import { useToast } from "@/hooks/use-toast";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AuthForm({ origin }){
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const onSignin = async ()=> {
        try {
            console.log('trying')
            setLoading(true);
            await signIn('google');
        } catch (error) {
            console.error(error.message);
            toast({
                variant: "destructive",
                title: 'Uh oh!',
                description: "Failed to sign in"
            })
        } finally{
            setLoading(false);
        }
    }
    return <div className="w-full sm:w-1/2 md:w-1/5 mx-4 p-4 rounded-lg bg-zinc-800 flex flex-col items-center gap-4">
            <Anvil className="size-12 text-gray-300" />
            <p className="text-center text-sm text-gray-200">{origin == 'signup' ? 'Welcome, by continuing with GeekCMS sign in, you\'ll be a Geek' : "Welcome back, hope to have you back!" } </p>
            <button onClick={onSignin} className="flex gap-2 items-center bg-gray-500/50 hover:bg-gray-500/40 transition-colors duration-200 px-10 py-2 rounded font-bold text-lg"> <Icons.GoogleLogo className="size-7" /> {loading? 'Loading...' : origin === 'signup' ? 'Sign up' : 'Sign In'}</button>
            {origin === 'signup' ? 
            <p className="text-sm text-gray-400 text-center">Already having an account? <Link className="underline" href="/sign-in">Sign In</Link></p>
             : 
            <p className="text-sm text-gray-400">New to GeekCMS? <Link className="underline" href="/sign-up">Sign up</Link></p>
            }
        </div>
}
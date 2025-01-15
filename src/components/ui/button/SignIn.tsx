"use client"
import { useSession, signIn } from 'next-auth/react';

const SignIn = ({ title = "Signin with Google" }: { title?: string }) => {
    const { data: session } = useSession();

    const handleSignIn = async () => {
        await signIn("google")
    }

    if (session?.user) {
        return (<p>{session.user?.name}</p>)
    }

    return (
        <button onClick={handleSignIn} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            {title}
        </button>
    )
}

export default SignIn;
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import Link from '@/components/ui/link/Link';
import Button from '@/components/ui/button/Button';

const Navigation = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDropdownOpen(false);
        signOut();
        router.push("/");
    };

    const handleBackgroundClick = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('click', handleBackgroundClick);
        }
        return () => {
            window.removeEventListener('click', handleBackgroundClick);
        };
    }, []);

    if (session?.user) {
        return (
            <nav className="nav">
                <div className="relative inline-block">
                    <Button
                        className="px-2 py-1 hover:text-gray-600 focus:outline-none"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                    >
                        My Account
                    </Button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                            <Link
                                onClick={() => setIsDropdownOpen(false)}
                                href="/profile"
                                className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                My Profile
                            </Link>
                            <Button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </nav>
        )
    }

    return null;
}

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="logo">
                    Analytics App
                </Link>
                <Navigation />
            </div>
        </header>
    );
}

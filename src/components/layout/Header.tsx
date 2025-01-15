"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        alert("Logged out");
        router.push("/");
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="logo">
                    Analytics App
                </Link>
                <nav className="nav">
                    <div className="relative inline-block">
                        <button
                            className="px-2 py-1 hover:text-gray-600 focus:outline-none"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            My Account
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                <Link
                                    href="/profile"
                                    className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

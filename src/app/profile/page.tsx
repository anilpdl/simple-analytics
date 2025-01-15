import Link from "@/components/ui/link/Link";

export const metadata = {
    title: "Profile",
};

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Coming soon</h1>
            <p className="text-lg text-gray-500">This page is under construction. Please check back later for updates.</p>
            <Link href="/dashboard" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Go to Dashboard</Link>
        </div>
    )
}

export default Profile

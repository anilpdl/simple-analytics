import Link from "next/link";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            Homepage
            <br />
            <Link href="/dashboard" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Go to Dashboard</Link>
        </div>
    );
};

export default Home;
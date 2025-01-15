import EventChart from '@/components/analytics/EventChart';
import EventTable from '@/components/analytics/EventTable';

export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard',
}

const Dashboard = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Events Over Time</h2>
                    <EventChart />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
                    <EventTable />
                </section>
            </div>
        </div>
    );
}

export default Dashboard;

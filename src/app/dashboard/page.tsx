"use client"
import { useEffect, useState } from 'react';

import EventChart from '@/components/analytics/EventChart';
import EventTable, { Event } from '@/components/analytics/EventTable';
import { CHART_DATA, RECENT_DATA } from '@/data/sampleData';

const Dashboard = () => {
    const [isChartLoading, setIsChartLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsTableLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsChartLoading(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Events Over Time</h2>
                    <EventChart isLoading={isChartLoading} data={CHART_DATA} />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
                    <EventTable isLoading={isTableLoading} events={RECENT_DATA as unknown as Event[]} />
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
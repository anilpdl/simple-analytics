"use client";

import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import Button from '@/components/ui/button/Button';
import { AppAnalytics } from '@/lib/analytics';

interface UserEvent {
    id: string;
    type: string;
    count: number;
}

interface EventData {
    timestamp: string;
    count: number;
    events: UserEvent[];
}

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

const EventChart = () => {
    const [data, setData] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const data = await AppAnalytics.getChartData();
        setData(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="h-[300px] w-full animate-pulse bg-gray-100 rounded-lg" />
        );
    }

    if (!data || data.length === 0) {
        return <div className="h-[300px] w-full bg-gray-100 rounded-lg">No data available</div>;
    }

    return (
        <>
            <Button className="mb-4 bg-gray-100 p-2 rounded-lg text-sm" onClick={fetchData}>
                Refresh
            </Button>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
                        <YAxis />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const events = payload[0].payload.events;

                                    return (
                                        <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                                            <p className="font-semibold">{`Date: ${formatTimestamp(payload[0].payload.timestamp)}`}</p>
                                            {events.map((event: UserEvent) => (
                                                <p key={event.id} className="text-sm">{`${event.type}: ${event.count}`}</p>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default EventChart;

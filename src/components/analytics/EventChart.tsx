"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

interface EventChartProps {
    data: EventData[];
    isLoading?: boolean;
}

const EventChart = ({ data, isLoading = false }: EventChartProps) => {
    if (isLoading) {
        return (
            <div className="h-[300px] w-full animate-pulse bg-gray-100 rounded-lg" />
        );
    }

    if (!data || data.length === 0) {
        return <div className="h-[300px] w-full bg-gray-100 rounded-lg">No data available</div>;
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const events = payload[0].payload.events;

                                return (
                                    <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                                        <p className="font-semibold">{`Date: ${payload[0].payload.timestamp}`}</p>
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
    );
}

export default EventChart;

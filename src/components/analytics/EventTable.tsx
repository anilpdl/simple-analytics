"use client";

import { useEffect } from "react";

import { AppAnalytics } from "@/lib/analytics";
import { useState } from "react";

export interface Event {
    id: string;
    type: string;
    timestamp: string;
    details: string;
}

const EventTable = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await AppAnalytics.getEvents();
            setEvents(events);
            setIsLoading(false);
        };

        fetchEvents();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full space-y-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                        </th>
                    </tr>
                </thead>
                {events.length === 0 ? <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900" colSpan={3}>No events found</td>
                    </tr>
                </tbody> : <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {event.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(event.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                {event.details}
                            </td>
                        </tr>
                    ))}
                </tbody>}
            </table>
        </div>
    );
}

export default EventTable;
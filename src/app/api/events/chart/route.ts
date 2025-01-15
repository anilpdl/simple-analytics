import { NextRequest, NextResponse } from 'next/server';

import { prisma } from "@/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Get time range parameters with defaults
        const endDate = new Date(searchParams.get('endDate') || new Date().toISOString());
        const startDate = new Date(searchParams.get('startDate') || new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)); // Default to 7 days

        // Fetch events within the time range
        const events = await prisma.event.findMany({
            where: {
                timestamp: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: {
                timestamp: 'asc',
            },
        });

        // Group events by hour
        const groupedEvents = events.reduce((acc: Record<string, any>, event) => {
            const hourTimestamp = new Date(event.timestamp);
            hourTimestamp.setMinutes(0, 0, 0);
            const key = hourTimestamp.getTime();

            if (!acc[key]) {
                acc[key] = {
                    timestamp: key,
                    count: 0,
                    events: {},
                };
            }

            // Initialize event type if not exists
            if (!acc[key].events[event.type]) {
                acc[key].events[event.type] = {
                    id: event.type,
                    type: event.type,
                    count: 0,
                };
            }

            // Increment counts
            acc[key].count++;
            acc[key].events[event.type].count++;

            return acc;
        }, {});

        // Transform the grouped data into the required format
        const chartData = Object.values(groupedEvents).map((group: any) => ({
            timestamp: group.timestamp,
            count: group.count,
            events: Object.values(group.events),
        }));

        return NextResponse.json(chartData);
    } catch (error) {
        console.error('Failed to fetch chart data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch chart data' },
            { status: 500 }
        );
    }
} 
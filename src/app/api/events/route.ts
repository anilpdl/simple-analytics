import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

const eventSchema = z.object({
    type: z.string(),
    details: z.string().optional(),
    path: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const body = await req.json();

        const validatedData = eventSchema.parse(body);

        const event = await prisma.event.create({
            data: {
                ...validatedData,
                userId: session?.user?.id || null,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Failed to create event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);

        const limit = parseInt(searchParams.get('limit') || '50');
        const type = searchParams.get('type');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        const where: any = {};

        if (type) {
            where.type = type;
        }

        if (startDate || endDate) {
            where.timestamp = {};
            if (startDate) where.timestamp.gte = new Date(startDate);
            if (endDate) where.timestamp.lte = new Date(endDate);
        }

        const events = await prisma.event.findMany({
            where,
            orderBy: {
                timestamp: 'desc',
            },
            take: Math.min(limit, 100),
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
} 
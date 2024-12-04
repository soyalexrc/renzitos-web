import * as jwt from "jsonwebtoken";
import prisma from "@/lib/db/prisma";

export async function GET(request: Request) {
    const headers = request.headers;
    const token = headers.get('authorization')?.replace('Bearer ', '');

    try {
        if (!token) {
            return Response.json({ error: 'Token is required' }, { status: 400 });
        }

        if (!process.env.JWT_SECRET) {
            return Response.json({ error: "JWT_SECRET not found" }, { status: 500 });
        }

        jwt.verify(token, process.env.JWT_SECRET);

        const clients = await prisma.clients.findMany();

        return Response.json({ data: clients }, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error?.name === 'TokenExpiredError') {
            return Response.json({ error: 'Token expired' }, { status: 401 });
        }
        return Response.json({ error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const headers = request.headers;
    const body = await request.json();
    const token = headers.get('authorization')?.replace('Bearer ', '');

    try {
        if (!token) {
            return Response.json({ error: 'Token is required' }, { status: 400 });
        }

        if (!process.env.JWT_SECRET) {
            return Response.json({ error: "JWT_SECRET not found" }, { status: 500 });
        }

        jwt.verify(token, process.env.JWT_SECRET);

        const client = await prisma.clients.create({ data: body });

        return Response.json({ data: client }, { status: 200 });
    } catch (error) {
        if (error instanceof  Error && error?.name === 'TokenExpiredError') {
            return Response.json({ error: 'Token expired' }, { status: 401 });
        }
        return Response.json({ error }, { status: 500 });
    }
}

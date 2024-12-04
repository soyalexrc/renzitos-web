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

        const providers = await prisma.providers.findMany();

        return Response.json({ data: providers }, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error?.name === 'TokenExpiredError') {
            return Response.json({ error: 'Token expired' }, { status: 401 });
        }
        return Response.json({ error }, { status: 500 });
    }
}

export async function POST() {
    return Response.json({ text: 'sample' }, { status: 200 });
}

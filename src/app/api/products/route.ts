import * as jwt from "jsonwebtoken";
import prisma from "@/lib/db/prisma";
import slugify from 'slugify';

export async function GET(request: Request) {
    const headers = request.headers;
    const token = headers.get('authorization')?.replace('Bearer ', '');

    try {
        if (!token) {
            return Response.json({error: 'Token is required'}, {status: 400});
        }

        if (!process.env.JWT_SECRET) {
            return Response.json({error: "JWT_SECRET not found"}, {status: 500});
        }

        jwt.verify(token, process.env.JWT_SECRET);

        const products = await prisma.products.findMany();

        return Response.json({data: products}, {status: 200});
    } catch (error: any) {
        if (error?.name === 'TokenExpiredError') {
            return Response.json({error: 'Token expired'}, {status: 401});
        }
        return Response.json({error}, {status: 500});
    }
}

export async function POST(request: Request) {
    const headers = request.headers;
    const body = await request.json();
    const token = headers.get('authorization')?.replace('Bearer ', '');

    try {
        if (!token) {
            return Response.json({error: 'Token is required'}, {status: 400});
        }

        if (!process.env.JWT_SECRET) {
            return Response.json({error: "JWT_SECRET not found"}, {status: 500});
        }

        jwt.verify(token, process.env.JWT_SECRET);

        const product = await prisma.products.create({
            data: {
                ...body,
                slug: slugify(body.title, {lower: true}),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        });

        return Response.json({data: product}, {status: 200});
    } catch (error: any) {
        if (error?.name === 'TokenExpiredError') {
            return Response.json({error: 'Token expired'}, {status: 401});
        }
        console.log(JSON.stringify(error));
        return Response.json({error}, {status: 500});
    }
}

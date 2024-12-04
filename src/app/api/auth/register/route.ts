import {hash} from 'argon2';
import prisma from "@/lib/db/prisma";

export async function POST(request: Request) {
    const body = await request.json();

    const hashedPassword = await hash(body.password);

    const user = await prisma.users.create({
        data: {
            ...body,
            password: hashedPassword
        }
    })


    return Response.json(user, { status: 201 });
}

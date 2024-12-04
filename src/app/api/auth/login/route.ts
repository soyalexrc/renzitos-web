import * as jwt from 'jsonwebtoken';
import prisma from "@/lib/db/prisma";
import { verify } from 'argon2';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
        return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const valid = await verify(user.password, password);

    if (!valid) {
        return Response.json({ error: 'Invalid password' }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
        return Response.json({ error: "JWT_SECRET not found" }, { status: 500 });
    }

    const token = jwt.sign({ ...user, password: '' }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    return Response.json({ token }, { status: 200 });
}

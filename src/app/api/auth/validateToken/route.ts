import * as jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const { token } = await request.json();

    if (!token) {
        return Response.json({ error: 'Token is required' }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
        return Response.json({ error: 'JWT_SECRET not found' }, { status: 500 });
    }

    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET);

        console.log(isValid);

        if (!isValid) {
            return Response.json({ error: 'Invalid token' }, { status: 401 });
        }

        return Response.json({ isValid }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Something went wrong!, ${error}` }, { status: 500 });
    }
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}


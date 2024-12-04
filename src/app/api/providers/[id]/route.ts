export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}


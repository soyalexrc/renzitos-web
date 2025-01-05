export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}

export async function PUT({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return Response.json({
        id
    }, { status: 200 })
}


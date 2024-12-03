export async function GET(request: Request, { params }: { params: { id: string } }) {
    return Response.json({
        id: params.id
    }, { status: 200 })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    return Response.json({
        id: params.id
    }, { status: 200 })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    return Response.json({
        id: params.id
    }, { status: 200 })
}


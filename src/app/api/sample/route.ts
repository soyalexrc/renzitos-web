
export async function  GET(req: Request) {
    const payload = {
        text: 'sample'
    }

    return Response.json(payload, { status: 200 })
}

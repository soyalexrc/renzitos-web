
export async function  GET() {
    const payload = {
        text: 'sample'
    }

    return Response.json(payload, { status: 200 })
}

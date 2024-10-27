import { prisma } from "@/lib/prisma";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import { NextResponse } from "next/server";


export async function GET(request, { params } ){
    const { slug } = params;
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
            status: "PUBLISHED"
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })

    // console.log(post, 'post single got from prisma')
    if(!post) {
        return NextResponse.json({ message: 'could not find the post'}, { status: 404 })
    } 
    return NextResponse.json(post,{
        status: 200,
        // headers: { 'Content-Type': "application/json"}
    })
}
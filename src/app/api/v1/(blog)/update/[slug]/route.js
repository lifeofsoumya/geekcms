import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const { slug } = params;
    const body = await request.json();
    const {title, ogImage, content, excerpt, metaDescription, category, keywords, status} = body;

    const session = await getServerSession(authOptions);
    const admin = await isAdmin(session);
    // console.log(session, 'inside put verb the session is given');
    
    const post = await prisma.post.findUnique({
        where: { slug },
        select: { authorId: true }
    })

    if(!post){
        return NextResponse.json({ message: "Post not found" }, { status : 404 })
    }

    const isAuthor = post.authorId === session.user.id;

    if(!isAuthor && !admin){
        return NextResponse.json({ message: "Not authorized" }, { status : 403 })
    }

    try {
        const updatedPost = await prisma.post.update({
            where: { slug },
            data: { 
                title, 
                content,
                thumbnail: ogImage || null,
                desc: metaDescription || null,
                keywords: keywords || null,
                excerpt,
                status
            }
        })
        revalidateTag(slug);

        return NextResponse.json(updatedPost, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "failed to update Post"}, { status: 500 })
    }
}

export async function GET(request, { params }){
    const { slug } = params;

    const session = await getServerSession(authOptions);
    const admin = await isAdmin(session);

    const post = await prisma.post.findUnique({
        where: { slug }
    })

    if(!post) {
        return NextResponse.json({ message: "Post not found" }, { status : 404 })
    }

    const isAuthor = session.user.id == post.authorId;

    if(!isAuthor && !admin){
        return NextResponse.json({ message: "You are not allowd to edit the post"}, { status : 403})
    }
    return NextResponse.json(post, { status: 200})
}
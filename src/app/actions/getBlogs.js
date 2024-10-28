import { prisma } from "@/lib/prisma";
import { config } from "@/static/config";

export async function getAllBlogs({page, category}){
    const postsToShow = config.perPage;

    let query = {
        take: postsToShow,
        skip: postsToShow * (page - 1),
        where: { 
            ...(category && { 
                catSlug: {
                    equals: category,
                    mode: 'insensitive'
                }
            })
         },
        orderBy: {
            createdAt: "desc"
        }
    }

    const [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({
            where: {
                ...(category && { catSlug: category })
            }
        })
    ])

    return { posts, count}
}

export async function getUserBlogs({page, category, userId}){
    const postsToShow = config.perPage;

    let queryBase = {
        authorId: userId,
        ...(category && { 
            catSlug: {
                equals: category,
                mode: 'insensitive'
            }
        })
    }

    let query = {
        take: postsToShow,
        skip: postsToShow * (page - 1),
        where: queryBase,
        orderBy: {
            createdAt: "desc"
        }
    }

    const [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({
            where: queryBase
        })
    ])

    return { posts, count}
}


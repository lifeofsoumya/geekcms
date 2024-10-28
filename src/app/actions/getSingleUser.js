import { prisma } from "@/lib/prisma";

export default async function getSingleUser(username){
    const user = await prisma.user.findUnique({
        where: {
            username
        },
        select: {
            name: true,
            image: true, 
            createdAt: true,
            username: true,
            Post: {
                select: {
                    title: true,
                    slug: true,
                    thumbnail: true,
                    excerpt: true
                }
            }
        } 
    })
    return user;
}
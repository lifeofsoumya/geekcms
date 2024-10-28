import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";
import "@/styles/blog.css"
import { notFound } from "next/navigation";

const fetchSingleBlog = async(slug)=> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`, { next: {tags: [slug]}})
    if(res.status == 404){
        notFound();
    }
    const data = await res.json();
    console.log(data, 'single blog')
    return data;
}

export async function generateMetadata({ params }){
    const res = await fetchSingleBlog(params.slug);

    return {
        title: res.title,
        description: res.excerpt,
        openGraph: {
            images: [res.thumbnail]
        }
    }
}

export default async function SingleBlog({ params }){
    const { slug } = params;
    const post = await fetchSingleBlog(slug);

    return (
        <section>
            <div className="flex flex-col gap-4 items-center">
                {post.thumbnail && <Image className="rounded border w-[90%] md:w-[700px]" src={post.thumbnail} width={500} height={250} alt={post.title}/>}
                <h1 className="text-2xl md:text-4xl font-bold">{post.title}</h1>
                <div className="meta-of-a-blog space-y-2">
                    <div className="flex gap-2 items-center">
                        <Calendar className="text-gray-400 size-4" />
                        <p className="text-gray-400 text-xs">Created on: {dateFormat(post.createdAt)}</p>
                    </div>
                    <div className="text-xs flex items-center gap-2">
                        <p>Category:</p>
                        <p className="badge bg-gray-600/30 border border-gray-700 w-fit px-2 py-1 rounded">{post.catSlug}</p>
                    </div>
                    {post?.keywords && <div className="text-xs flex items-center gap-2">
                        <p>Tags:</p>
                        {post?.keywords.split(",").map((tag, index)=> <p key={`${tag}_${index}`} className="badge bg-gray-600/30 border border-gray-700 w-fit px-[4px] py-[2px] rounded">{tag}</p>)}
                    </div>}
                </div>
                <div className="blogContent text-sm w-[90%] md:w-2/3 text-gray-300" dangerouslySetInnerHTML={{__html: post.content}}>
                </div>
            </div>

        </section>
    )    
}
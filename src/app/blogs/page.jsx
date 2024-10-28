import Image from "next/image";
import Link from "next/link";

// const blogConfig = [
//     {
//         "title": "React vs NextJS",
//         "excerpt": "Nextjs is the ultimate development framework...",
//         "image": "/thumbnails/react-v-next.png",
//         "url": '/demo-slug'    
//     },
//     {
//         "title": "Dreams to be a Remote developer",
//         "excerpt": "Get a job as remote developer...",
//         "image": "/thumbnails/dreams.png"  ,
//         "url": '/demo-slug'  
//     },
//     {
//         "title": "Become a backend dev in no time",
//         "excerpt": "how to becmoe a backend developer in 2025...",
//         "image": "/thumbnails/become-backend-dev.png"    ,
//         "url": '/demo-slug'
//     },
// ]

const fetchAllBlogs = async()=> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get`);
    const data = await res.json();
    return data;
}

export default async function Blogs(){
    const blogData = await fetchAllBlogs();
    return (
        <section className="grid gap-4 grid-cols-2 md:grid-cols-3 p-8">
            {
                blogData.map((blog, index)=> {
                    return <BlogCard key={blog.title} title={blog.title} excerpt={blog.excerpt} image={blog.thumbnail} url={blog.slug} />
                })
            }
        </section>
    )
}

const BlogCard = ({ title, excerpt, image, url }) => {
    console.log(title, excerpt, image, url, ' data for each')
    return <div className="bg-gray-600/20 rounded-lg border flex flex-col p-1 gap-1 hover:scale-[1.03] transition-all delay-100 duration-300">
        {image && <Image className="w-full rounded-md" src={image} width={300} height={170} alt={title} />}
        <h2 className="text-xl font-bold text-gray-200">{title}</h2>
        <p className="text-sm text-gray-400">{excerpt}</p>
        <Link className="bg-zinc-600/70 py-2 px-3 rounded w-fit text-xs" href={`/blog/${url}`}>Read More</Link>
    </div>
}
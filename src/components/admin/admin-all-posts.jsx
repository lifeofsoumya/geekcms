import { getAllBlogs } from "@/app/actions/getBlogs";
import EditableBlogCards from "./EditableBlogCards";
import Pagination from "../pagination";
import { config } from "@/static/config";
import CategoryFilter from "../category-filter";

export default async function AdminAllPosts({ page =1, category }){
    
    const { posts, count } = await getAllBlogs({page, category});

    return (
        <section className="p-8 flex flex-col gap-4">
            <h2>Manage all the Blogs</h2>
            <CategoryFilter />
            {posts.map(post=> {
                return <EditableBlogCards key={post.id} post={post}/>
            })}
            <Pagination 
                className="fixed bottom-10 left-1/2 -translate-x-1/2"
                currentPage={page}
                totalItems={count}
                perPage={config.perPage}
            />
        </section>
    )
}
import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";


export default function SingleBlog(){
    const tempTags = "SpaceX, Nasa, Exploration"

    const tempHtml = `
        <p>Demo content</p>
        <h2>Test h2<h2>
    `
    return (
        <section>
            <div className="flex flex-col gap-4 items-center">
                <Image className="rounded border w-[90%] md:w-[700px]" src="/thumbnails/dreams.png" width={500} height={250} alt="Page title "/>
                <div className="meta-of-a-blog space-y-2">
                    <div className="flex gap-2 items-center">
                        <Calendar className="text-gray-400 size-4" />
                        <p className="text-gray-400 text-xs">Created on: {dateFormat(new Date())}</p>
                    </div>
                    <div className="text-xs flex items-center gap-2">
                        <p>Category:</p>
                        <p className="badge bg-gray-600/30 border border-gray-700 w-fit px-2 py-1 rounded">Space exploration</p>
                    </div>
                    <div className="text-xs flex items-center gap-2">
                        <p>Tags:</p>
                        {tempTags.split(",").map(tag=> <p className="badge bg-gray-600/30 border border-gray-700 w-fit px-[4px] py-[2px] rounded">{tag}</p>)}
                    </div>
                </div>
                {/* <div className="content" dangerouslySetInnerHTML={{__html: tempHtml}}>
                </div> */}
                <p className="text-sm w-[90%] md:w-2/3 text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus rem, libero sint molestias quas excepturi numquam esse exercitationem consequuntur amet sunt.
                    <br/>
                    velit provident perspiciatis tempore dignissimos obcaecati ut animi qui, consequatur aut? Cupiditate atque iusto labore animi officiis odio consequuntur, voluptatum dolore delectus nemo sapiente ratione ullam et veritatis, nostrum quas ut quo, fuga quod perspiciatis odit ea deleniti officia. Deserunt ea molestiae temporibus consequatur nobis eveniet quos nihil, libero exercitationem quisquam a dolorum repudiandae atque id itaque quasi vel quae qui blanditiis non, nesciunt doloribus, fugit labore iusto! Repellat rem fugiat maiores quod, totam, commodi minus tempora iusto non incidunt.
                    <br/>
                    id veritatis? Necessitatibus iure sint nam, maiores labore nostrum tenetur dolore temporibus optio aspernatur illum sunt eaque ab sit quia ut quisquam totam praesentium obcaecati et pariatur mollitia ipsum beatae? Earum asperiores sapiente provident doloremque impedit magni reiciendis iste? Ut vel alias omnis error deserunt distinctio quaerat ipsum ducimus cumque. Asperiores facilis dolorem rerum totam pariatur exercitationem, recusandae sequi maxime laudantium ab cum quae natus aliquid dolor vero, adipisci sapiente! Esse similique eos cupiditate est ratione suscipit, sint reiciendis
                </p>
            </div>

        </section>
    )    
}
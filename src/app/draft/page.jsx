"use client";
import Editor from "@/components/Editor";

export default function Draft(){
    const savePost = async({ title, slug, ogImage, content, excerpt, metaDescription, category, keywords, status }) => {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, slug, ogImage, content, excerpt, metaDescription, category, keywords, status })
        })
        if(!res.ok){
            throw new Error('Post saving failed');
        }
    }
    return <div className="p-8">
        <h1 className="font-bold text-2xl pb-3">Create a new Post</h1>
        <Editor onSave={savePost} />
    </div>
}
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import AIContent from "@/utils/ai-content";
import { Sparkles } from "lucide-react";

const schema = z.object({
  title: z.string().min(10, { message: 'Title must contain 10 or more characters'}).min(1, { message: "Title must not be empty"}),
  excerpt: z.string().min(10, { message: "Please add some details in the excerpt"}),
  category: z.string().min(1, { message: "Please add a category"}),
  metaDescription: z.string().optional(),
  keywords: z.string().min(1, { message: "Keywords should be there for SEO benefits"}),
  status: z.enum(["DRAFT", "PUBLISHED"])
})

export default function Editor({ onSave, initialData }) {
  const { register, handleSubmit, setValue } = useForm();
  const [content, setContent] = useState("");
  const [ogImage, setOgImage] = useState("");
  const router = useRouter();
  const [selectionExists, setSelectionExists] = useState(false);
  const ideaRef = useRef(null);
  const closeDialogRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(()=> {
    if(initialData){
      setValue('title', initialData.title);
      setContent(initialData.content);
      setOgImage(initialData.thumbnail)
      setValue('keywords', initialData.keywords || "");
      setValue('category', initialData.catSlug || "");
      setValue('excerpt', initialData.excerpt || "");
      setValue('metaDescription', initialData.desc || "");
      setValue('status', initialData.status);
    }
  }, [initialData])

  const handleForm = (data) => {
    try {
      const generatedSlug = initialData ? initialData.slug : slugify(data.title);
      onSave({...data, slug: generatedSlug, ogImage, content});
      toast({
        title: "Success",
        description: initialData ? "Your blog was updated" : "Your blog page was published"
      })
      if(data.status === "PUBLISHED") router.push(`/blog/${generatedSlug}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGenerateContentUsingAI = async () => {
    try {
      const response = await AIContent({ text: ideaRef.current.value, customInstructions: 'Generate content with proper facts', contentGen: true })
      console.log(response, ' response from AI');
      setContent(response);
    } catch (error) {
      console.error(error.message);
    } finally{
      closeDialogRef.current?.click();
    }
  }

  const handleRephrase = async() => {
    const selection = quillRef?.current?.getEditor().getSelection();
    if(selection && selection.length > 0){
      try {
        const selectedText = quillRef?.current?.getEditor().getText(selection.index, selection.length)
        const res = await AIContent({ text: selectedText, customInstructions: "Rewrite this text", contentGen: false });
        quillRef?.current?.getEditor().deleteText(selection.index, selection.length);
        quillRef?.current?.getEditor().insertText(selection.index, res);
        setSelectionExists(false);
        
      } catch (error) {
        console.error(error.message);
        toast({
          title: "Uh oh!",
          description: "Content rephrasing failed",
          variant: "desctructive"
        })
      }
    } else{ 
      toast({
        title: "Please select some text to rephrase"
      })
    }
  }

  const handleSelectionChanged = () => {
    const selection = quillRef?.current?.getEditor().getSelection();
    setSelectionExists(selection && selection.length > 0);
  }
  return (
    <section>
      <form className="space-y-4" onSubmit={handleSubmit(async(data)=> {
        try {
          await schema.parseAsync(data);
          await handleForm(data);
        } catch (error) {
          console.error(error.message);
          if(error instanceof z.ZodError){
            error.errors.forEach(error=> {
              toast({ title: "Error", description: error.message, variant: "destructive"})
            })
          }
        }

        ;
      })}>
        <input
          {...register("title")}
          placeholder="Enter the post title"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          onChangeSelection={handleSelectionChanged}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { header: "3" }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "code-block"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
            "code-block",
          ]}
        />
        <Dialog>
          <DialogTrigger className="flex gap-2 items-center border-2 p-2 rounded">Generate content using AI <Sparkles /></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                Give a brief on the type of content you want to generate
              </DialogDescription>
              <textarea ref={ideaRef} className="bg-zinc-800 p-2 rounded outline-none" rows={10} />
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleGenerateContentUsingAI}>Generate</Button>
              <DialogClose asChild ref={closeDialogRef}>
                  <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <input
          {...register("excerpt")}
          placeholder="Enter an excerpt"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <input
          {...register("category")}
          placeholder="Enter a category"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <h2 className="text-xl font-bold"> SEO Data</h2>
        <ImageUpload returnImage={setOgImage} preloadedImage={ogImage} />
        <input
          {...register("keywords")}
          placeholder="Enter Keywords"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />

        <input
          {...register("metaDescription")}
          placeholder="Enter Meta Description"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <div className="flex gap-2">
            <select
                {...register("status")}
                className="font-bold text-lg bg-zinc-600 px-3 py-1 rounded-sm outline-none"
            >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Publish</option>
            </select>
            <button
                type="submit"
                className="bg-zinc-800 px-3 py-2 rounded cursor-pointer"
                >
                Save
            </button>
        </div>
      </form>
            {selectionExists && <Button className="fixed bottom-10 right-10" onClick={handleRephrase} variant="outline">Rewrite using AI <Sparkles /></Button>}
    </section>
  );
}

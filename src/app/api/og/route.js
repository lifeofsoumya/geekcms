import { Icons } from "@/components/Icons";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "edge";

const font = fetch(new URL('./lato.ttf', import.meta.url)).then(res => res.arrayBuffer());

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const title = (searchParams.get('title').charAt(0).toUpperCase() + searchParams.get("title").slice(1)) || "GeekCMS";

        return new ImageResponse(
            (
                <div
                    tw="flex text-white px-20 py-[70px] w-full h-full justify-between flex-col"
                    style={{
                        backgroundColor: 'black'
                    }}
                >
                    <Icons.GoogleLogo style={{color: '#fff'}} size={70} />
                    <h1
                        tw="text-[80px]"
                        style={{
                            textShadow: '0 2px 2px #000',
                            backgroundImage: "linear-gradient(90deg, #fff 40%, #aaa)",
                            backgroundClip: "text",
                        }}
                    >
                        {title}
                    </h1>
                    <h2>
                        Powered by GeekCMS
                    </h2>
                </div>
            ), {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'lato',
                        data: await font,
                        style: 'italic'
                    }
                ]
            }
        )
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: 'Failed to generate the OG Image'}, { status: 500})
    }
}
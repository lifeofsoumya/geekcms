"use server";

export default async function AIContent({ text, customInstructions = "", contentGen = false}){
    let basePrompt;
    if(contentGen){
        basePrompt = `You are a senior and experience content writer, you are asked to compose a elaborated, fact checked content.\
        The content should be properly bulleted using numbers, headings.\
        The content topic is give as follows: ${text}
        Below are some custom instructions for the content: ${customInstructions}
        `
    } else {
        basePrompt = `You are a senior content reviewer. Your task will be to go through given content and rewrite in easy to understand langugage.\
        The content you need need to rephrase is as follows: ${text}
        Some custom Instructions are: ${customInstructions}
        `
    }
    try {
        const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: basePrompt}],
                max_tokens: contentGen ? 1700 : 600
            })
        })
        if(!res.ok){
            throw new Error("Response not found");
        } 
        const data = await res.json();
        const returnValue = data.choices[0].message.content;
        console.log(returnValue, ' ai gener')
        return returnValue;
    } catch (error) {
        console.error(error.message);
    }
}
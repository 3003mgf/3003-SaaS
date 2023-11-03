import openai from "@/lib/openAI/openAI";
import { NextResponse } from "next/server";

export async function POST(request: Request){

  const req = await request.json();
  const { user } = req;

  if(!user){
    return NextResponse.json({Error: "No user attached to the req.body"});
  };

  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `My name is ${user}, I want to start a conversation with somebody, please give me a friendly and creative phrase to say Hi. You can make jokes as well.`,
    max_tokens: 500,
    temperature: 0.8
  });

  const suggestion = completion.choices[0].text;

  return NextResponse.json({suggestion});
}
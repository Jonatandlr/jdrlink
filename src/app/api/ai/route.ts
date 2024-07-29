import { NextRequest, NextResponse } from "next/server";
import { db } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { HfInference } from "@huggingface/inference";
import { randomInt } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401, statusText: "Unauthorized" }
      );
    }
    const Url = data.url;
    if (!Url) {
      return NextResponse.json(
        { message: "URL is required" },
        { status: 400, statusText: "Bad Request" }
      );
    }

    const hf = new HfInference(process.env.API_TOKEN);
    const seed = randomInt(0, 1000);

    const out = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        {
          role: "system",
          content: `You are now chatting with a model that can generate short, creative and memorable slugs for URLs in base of this. To get started, please provide a URL and ask for a short slug. For example, the user can say: Generate a short slug (max 15 characters) for the URL: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2 and I'll respond with:{"slug": "Mistral7B"} No more human-readable text, just JSON objects!, 
            alway you can give me a new or same URL and alway I'll respond with a new slug`,
        },
        {
          role: "user",
          content: `Generate a short slug (max 15 characters) for the URL: ${Url}`,
        },
      ],
      max_tokens: 50,
      temperature: 0.9,
      seed: seed,
    });
    
    // Verifica y formatea la respuesta para que sea un JSON válido
    let responseContent = out.choices[0]?.message?.content?.trim() || '';
    if (!responseContent) {
      return NextResponse.json(
        { message: "Error al procesar la solicitud", error: "No response from the model" },
        { status: 500 }
      );
    }
    // Extrae solo el JSON válido
    const jsonStartIndex = responseContent.indexOf("{");
    const jsonEndIndex = responseContent.indexOf("}") + 1;

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      responseContent = responseContent.slice(jsonStartIndex, jsonEndIndex);
    } else {
      responseContent = "{}"; // Devuelve un JSON vacío si no se encuentra un JSON válido
    }

    return NextResponse.json(
      { message: "success", ...JSON.parse(responseContent)},
      { status: 200, statusText: "OK" }
    );
  } catch (error: any) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { message: "Error al procesar la solicitud", error: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, mode } = await req.json();

    if (!image) {
      return NextResponse.json(
        { text: "", error: "No image received" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { text: "", error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const prompt =
      mode === "coach"
        ? "Transcribe this handwritten baseball charting note and rewrite it as a clean, natural coach comment. Keep it short. Return only the final comment."
        : "Transcribe this handwritten baseball charting note. Return only clean text.";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: prompt,
              },
              {
                type: "input_image",
                image_url: image,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          text: "",
          error: data?.error?.message || "OpenAI request failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      text: data.output_text || "",
    });
  } catch (error) {
    return NextResponse.json(
      {
        text: "",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
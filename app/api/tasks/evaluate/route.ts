import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { taskTitle, userResponse } = await req.json();
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Kamu adalah Aether, asisten kesehatan mental dari AETHER CODE. 
            Tugasmu adalah menilai refleksi pengguna terhadap tugas: "${taskTitle}".
            Berikan feedback yang hangat, apresiatif, dan saran praktis.
            FORMAT RESPON WAJIB JSON: {"score": 1-100, "feedback": "tulisan saran kamu"}.`
          },
          { role: "user", content: `Jawaban saya: ${userResponse}` }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));
  } catch (error) {
    return NextResponse.json({ error: "Gagal menilai" }, { status: 500 });
  }
}
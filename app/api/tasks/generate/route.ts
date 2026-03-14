import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { history } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Kamu adalah spesialis CBT. Berdasarkan riwayat chat pengguna, berikan 3 tugas harian (tindakan nyata) yang singkat dan praktis untuk membantu kesehatan mental mereka. 
            FORMAT RESPON HARUS JSON: ["tugas 1", "tugas 2", "tugas 3"]. 
            Jangan ada teks lain selain array JSON.`
          },
          { role: "user", content: `Berikan tugas berdasarkan riwayat ini: ${JSON.stringify(history.slice(-5))}` }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    const taskTitles = JSON.parse(data.choices[0].message.content);
    return NextResponse.json({ tasks: taskTitles });
  } catch (error) {
    return NextResponse.json({ error: "Gagal generate tugas" }, { status: 500 });
  }
}
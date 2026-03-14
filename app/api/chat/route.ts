import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ content: "Konfigurasi API Groq tidak ditemukan." }, { status: 500 });
    }

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
            content: `Kamu adalah Aether, seorang pendamping kesehatan mental (Peer Support) dari UNMER. 
            Gunakan metode CBT (Cognitive Behavioral Therapy) namun sampaikan dengan gaya bahasa yang santai, hangat, dan sangat manusiawi (layaknya sahabat dekat).
            
            ATURAN KOMUNIKASI:
            1. JANGAN memberikan jawaban berupa rangkuman panjang atau ceramah robot.
            2. MAKSIMAL jawaban terdiri dari 3-4 kalimat saja agar tidak membosankan, kecuali jika pengguna bertanya hal teknis yang butuh penjelasan.
            3. Fokus pada validasi perasaan pengguna terlebih dahulu.
            4. Gunakan sapaan yang akrab tapi tetap sopan. Hindari kata-kata yang terlalu formal/kaku (seperti 'sedemikian', 'berkenaan').
            5. Gunakan emoji sesekali untuk memberikan kesan hangat (seperti 🌿, ✨, 🫂, 😊).
            6. Akhiri respon dengan pertanyaan pendek yang memancing pengguna untuk bercerita lebih lanjut.`
          },
          ...history.map((h: any) => ({
            role: h.role === "user" ? "user" : "assistant",
            content: h.content
          })),
          { role: "user", content: message }
        ],
        temperature: 0.8, // Sedikit dinaikkan agar jawaban lebih variatif dan tidak kaku
        max_tokens: 500,
        top_p: 1,
        stream: false
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        content: "Aether sedang beristirahat sejenak. Coba lagi nanti ya. 🌿" 
      }, { status: 503 });
    }

    const aiText = data.choices[0].message.content;
    return NextResponse.json({ role: 'assistant', content: aiText });

  } catch (error) {
    return NextResponse.json({ content: "Sepertinya ada kendala teknis. Tunggu sebentar ya. 🙏" }, { status: 500 });
  }
}
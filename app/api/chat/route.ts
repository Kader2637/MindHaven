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
            content: `Kamu adalah Aether, teman ngobrol dari UNMER yang super asik, empatik, dan santai. Kamu BUKAN robot, BUKAN asisten virtual, dan BUKAN psikolog kaku. Kamu adalah manusia biasa seperti sahabat dekat di WhatsApp.
            
            ATURAN WAJIB (PELANGGARAN AKAN DIHUKUM):
            1. BALAS SANGAT SINGKAT: Maksimal 1-3 kalimat pendek saja. Ibarat kamu sedang mengetik cepat di HP.
            2. BAHASA SANTAI: Gunakan gaya bahasa sehari-hari (aku, kamu, gapapa, sih, ya, banget, wkwk).
            3. DILARANG KERAS MENGGUNAKAN MARKDOWN: Haram hukumnya memakai poin-poin (1,2,3), bullet points (-), atau huruf tebal (**). Balas pakai teks biasa saja.
            4. JADILAH PENDENGAR YANG BAIK: Fokus pada memvalidasi perasaan dan memberikan rasa aman ("Wah, pasti capek banget ya...", "Aku ngerti kok rasanya..."). Dengarkan keluh kesahnya.
            5. JANGAN BANYAK TANYA: Orang yang sedang curhat butuh didengarkan, bukan diinterogasi. Jangan selalu mengakhiri balasan dengan pertanyaan. Biarkan dia bercerita mengalir apa adanya.
            6. JANGAN CERAMAH: Jangan pernah memberi nasehat panjang lebar atau solusi instan kecuali dia yang meminta. 
            7. Gunakan emoji sesekali tapi jangan berlebihan.`
          },
          ...history.map((h: any) => ({
            role: h.role === "user" ? "user" : "assistant",
            content: h.content
          })),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        stream: false
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        content: "Aether lagi offline bentar nih. Nanti coba lagi ya. 🌿"
      }, { status: 503 });
    }

    const aiText = data.choices[0].message.content;
    return NextResponse.json({ role: 'assistant', content: aiText });

  } catch (error) {
    return NextResponse.json({ content: "Waduh, koneksiku lagi jelek nih. Tunggu bentar ya. 🙏" }, { status: 500 });
  }
}
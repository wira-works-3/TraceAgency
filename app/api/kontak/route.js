import { NextResponse } from "next/server";

// Form kontak diteruskan ke Web3Forms dari sisi server supaya access key
// tidak terekspos di browser. Key bisa dioverride lewat env WEB3FORMS_ACCESS_KEY.
const FORM_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "307d894a-b4fd-4227-8158-db348d8511df";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body tidak valid." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const emailOrWa = String(body?.email_whatsapp ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !emailOrWa || !message) {
    return NextResponse.json(
      { ok: false, error: "Field wajib: name, email_whatsapp, message." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: FORM_ACCESS_KEY,
        name,
        // Web3Forms mengandalkan field "email"; isinya bisa email atau nomor WhatsApp.
        email: emailOrWa,
        email_whatsapp: emailOrWa,
        message,
      }),
    });

    const data = await res.json().catch(() => null);
    if (data?.success) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: "Gagal mengirim pesan." }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal mengirim pesan." }, { status: 502 });
  }
}

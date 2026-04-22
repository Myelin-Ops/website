import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ratelimit } from "@/lib/upstash";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstile(token) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();
  return data.success;
}

export async function POST(request) {
  try {
    const { name, email, message, turnstileToken } = await request.json();

    // 1. Verify Turnstile
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Bot verification token missing" },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstile(turnstileToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Bot verification failed" },
        { status: 403 }
      );
    }

    // 2. Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `contact_form_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Remaining": remaining.toString(), "X-RateLimit-Reset": reset.toString() } }
      );
    }

    // 3. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev",
      to: [process.env.CONTACT_EMAIL_TO],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111827; margin: 0; padding: 0; background-color: #ffffff; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 15px; }
              .header { text-align: center; margin-bottom: 40px; }
              .logo { font-size: 24px; font-weight: 900; color: #000; letter-spacing: 0.2em; text-transform: uppercase; margin: 0; }
              .logo span { color: #22d3ee; }
              .card { background: #ffffff; border-radius: 32px; padding: 40px; border: 1px solid #f3f4f6; box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05); }
              .title { font-size: 22px; font-weight: 800; margin-bottom: 32px; color: #111827; letter-spacing: -0.02em; }
              .field { margin-bottom: 24px; }
              .label { font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
              .value { font-size: 16px; color: #111827; font-weight: 600; }
              .message-box { background: #f9fafb; border-radius: 20px; padding: 24px; color: #374151; white-space: pre-wrap; margin-top: 8px; border: 1px solid #f3f4f6; font-size: 15px; }
              .button-container { margin-top: 40px; padding-top: 32px; border-top: 1px solid #f3f4f6; }
              .button { display: inline-block; background: #000000; color: #ffffff !important; text-decoration: none; padding: 18px 36px; border-radius: 16px; font-weight: 700; font-size: 14px; letter-spacing: 0.02em; }
              .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #9ca3af; font-weight: 500; }
              
              @media only screen and (max-width: 480px) {
                .container { padding: 20px 10px; }
                .card { padding: 24px; border-radius: 24px; }
                .logo { font-size: 20px; }
                .title { font-size: 20px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">MYELIN<span>OPS</span></h1>
              </div>
              <div class="card">
                <h2 class="title">New Message Received</h2>
                
                <div class="field">
                  <p class="label">From</p>
                  <p class="value">${name} <span style="color: #9ca3af; font-weight: 400; font-size: 14px;">&lt;${email}&gt;</span></p>
                </div>

                <div class="field">
                  <p class="label">Message</p>
                  <div class="message-box">${message}</div>
                </div>

                <div class="button-container">
                  <a href="mailto:${email}" class="button">Reply Directly</a>
                </div>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Myelin Ops. All rights reserved.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

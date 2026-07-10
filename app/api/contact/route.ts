import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const escape = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  try {
    await transporter.sendMail({
      from: `"Widgeon Point Website" <${process.env.SMTP_USER}>`,
      to: 'info@widgeonpoint.org',
      replyTo: email,
      subject: `Message from ${name} via widgeonpoint.org`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0D3275;padding:24px 32px;border-radius:8px 8px 0 0">
            <h2 style="color:#fff;margin:0;font-size:18px">New message via widgeonpoint.org</h2>
          </div>
          <div style="background:#F7F8FA;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0e6f0">
            <p style="margin:0 0 8px"><strong>Name:</strong> ${escape(name)}</p>
            <p style="margin:0 0 24px"><strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a></p>
            <p style="margin:0 0 8px"><strong>Message:</strong></p>
            <p style="background:#fff;padding:16px;border-radius:6px;border:1px solid #dde4ef;white-space:pre-wrap;margin:0">${escape(message)}</p>
          </div>
        </div>
      `,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Validate ──────────────────────────────────────────────
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ── Save to Supabase ──────────────────────────────────────
    const supabase = createAdminClient();
    const { error: dbError, data: inserted } = await supabase
      .from("enquiries")
      .insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          event_type: data.event_type,
          event_date: data.event_date,
          guest_count: data.guest_count,
          message: data.message,
          status: "new",
        },
      ])
      .select()
      .single();

    if (dbError) {
      // Log full error so it shows in terminal
      console.error("❌ Supabase insert error:", JSON.stringify(dbError, null, 2));
      // Return error to client so form shows it
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

    console.log("✅ Enquiry saved to DB:", inserted?.id);

    // ── Send emails via Resend ────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL;

    // Use Resend's free test sender if domain not verified yet.
    // Once you verify sandaltreebysk.com in Resend dashboard,
    // change FROM_EMAIL back to noreply@sandaltreebysk.com
    const fromEmail = process.env.FROM_EMAIL || "team@sandaltreebysk.com";

    if (!resendKey) {
      console.warn("⚠️  RESEND_API_KEY not set — skipping emails");
      return NextResponse.json({ message: "Enquiry saved. Email skipped (no API key)." });
    }

    const resend = new Resend(resendKey);

    const emailErrors: string[] = [];

    // Email to owner
    if (ownerEmail) {
      const { error: ownerErr } = await resend.emails.send({
        from: `Sandal Tree by SK <${fromEmail}>`,
        to: ownerEmail,
        subject: `🔔 New Enquiry — ${data.event_type} | ${data.name}`,
        html: ownerEmailHtml(data),
      });
      if (ownerErr) {
        console.error("❌ Owner email failed:", ownerErr);
        emailErrors.push(`Owner email: ${ownerErr.message}`);
      } else {
        console.log("✅ Owner email sent to:", ownerEmail);
      }
    } else {
      console.warn("⚠️  OWNER_EMAIL not set — skipping owner notification");
    }

    // Confirmation email to customer
    const { error: customerErr } = await resend.emails.send({
      from: `Sandal Tree by SK <${fromEmail}>`,
      to: data.email,
      subject: "Your Enquiry Has Been Received — Sandal Tree by SK",
      html: customerEmailHtml(data),
    });
    if (customerErr) {
      console.error("❌ Customer email failed:", customerErr);
      emailErrors.push(`Customer email: ${customerErr.message}`);
    } else {
      console.log("✅ Confirmation email sent to:", data.email);
    }

    return NextResponse.json(
      {
        message: "Enquiry submitted successfully",
        emailWarnings: emailErrors.length ? emailErrors : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Enquiry API unhandled error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ── Email templates ───────────────────────────────────────────

type EnquiryData = {
  name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string;
  guest_count: string;
  message: string;
};

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:11px 16px;background:#F9F6F0;border-bottom:1px solid #E8E2D6;
               font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#888;
               width:35%;font-family:Arial,sans-serif;">${label}</td>
    <td style="padding:11px 16px;border-bottom:1px solid #E8E2D6;
               font-size:14px;color:#1A1A1A;font-family:Arial,sans-serif;">${escHtml(value)}</td>
  </tr>`;
}

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function ownerEmailHtml(data: EnquiryData) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#F5F0E8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">

    <tr><td style="background:#1A1A1A;padding:28px 40px;text-align:center;">
      <p style="margin:0;color:#C9A55A;font-size:20px;font-family:Georgia,serif;font-weight:300;letter-spacing:3px;">
        Sandal Tree by SK</p>
      <p style="margin:6px 0 0;color:#C9A55A;font-size:10px;letter-spacing:4px;text-transform:uppercase;">
        Admin Notification</p>
    </td></tr>

    <tr><td style="padding:36px 40px 28px;">
      <h1 style="margin:0 0 6px;font-size:22px;font-weight:400;color:#1A1A1A;font-family:Georgia,serif;">
        New Booking Enquiry</h1>
      <p style="margin:0 0 24px;font-size:13px;color:#888;">
        Received on ${new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E2D6;">
        ${row("Name", data.name)}
        ${row("Phone", data.phone)}
        ${row("Email", data.email)}
        ${row("Event Type", data.event_type)}
        ${row("Event Date", data.event_date)}
        ${row("Guest Count", data.guest_count + " guests")}
      </table>

      <div style="margin-top:24px;padding:18px 20px;background:#FFFDF8;border-left:3px solid #C9A55A;">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#999;">Message</p>
        <p style="margin:0;font-size:14px;color:#333;line-height:1.75;">${escHtml(data.message)}</p>
      </div>

      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${escHtml(data.email)}?subject=Re: Your Event Enquiry — Sandal Tree by SK"
           style="display:inline-block;padding:12px 28px;background:#C9A55A;color:#fff;
                  font-size:11px;letter-spacing:2px;text-transform:uppercase;
                  text-decoration:none;font-family:Arial,sans-serif;">
          Reply to ${escHtml(data.name.split(" ")[0])}
        </a>
      </div>
    </td></tr>

    <tr><td style="background:#F5F0E8;padding:20px 40px;text-align:center;border-top:1px solid #E8E2D6;">
      <p style="margin:0;font-size:11px;color:#aaa;">Sandal Tree by SK &bull; Admin Panel</p>
    </td></tr>

  </table></td></tr></table></body></html>`;
}

function customerEmailHtml(data: EnquiryData) {
  const firstName = escHtml(data.name.split(" ")[0]);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#F5F0E8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">

    <tr><td style="background:#1A1A1A;padding:36px 40px;text-align:center;">
      <p style="margin:0;color:#C9A55A;font-size:26px;font-family:Georgia,serif;font-weight:300;letter-spacing:2px;">
        Sandal Tree</p>
      <p style="margin:4px 0 0;color:#C9A55A;font-size:10px;letter-spacing:4px;text-transform:uppercase;">by SK</p>
    </td></tr>

    <tr><td style="padding:44px 40px 32px;text-align:center;border-bottom:1px solid #E8E2D6;">
      <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A55A;">
        Thank You</p>
      <h1 style="margin:0 0 16px;font-size:26px;font-weight:300;color:#1A1A1A;
                 font-family:Georgia,serif;line-height:1.35;">
        Your Enquiry is Received,<br>${firstName}</h1>
      <p style="margin:0 auto;font-size:14px;color:#666;line-height:1.75;max-width:420px;">
        We are delighted to hear from you and will be in touch within
        <strong>24 hours</strong> to discuss your event.</p>
    </td></tr>

    <tr><td style="padding:32px 40px;">
      <p style="margin:0 0 18px;font-size:13px;color:#555;">Your enquiry summary:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E2D6;">
        ${row("Event Type", data.event_type)}
        ${row("Preferred Date", data.event_date)}
        ${row("Guest Count", data.guest_count + " guests")}
      </table>
      <p style="margin:24px 0 0;font-size:13px;color:#555;line-height:1.8;">
        In the meantime, explore our
        <a href="https://sandaltreebysk.com/gallery" style="color:#C9A55A;">gallery</a>
        or follow us on
        <a href="https://instagram.com/sandaltreebysk" style="color:#C9A55A;">@sandaltreebysk</a>.
      </p>
    </td></tr>

    <tr><td style="background:#1A1A1A;padding:28px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;color:#666;letter-spacing:2px;text-transform:uppercase;">
        Sandal Tree by SK</p>
      <p style="margin:0;font-size:11px;color:#555;">
        Luxury Banquet Hall &bull; Extraordinary Celebrations</p>
    </td></tr>

  </table></td></tr></table></body></html>`;
}

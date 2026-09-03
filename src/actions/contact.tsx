'use server';

import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  senderMail: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const { name, senderMail, subject, message } = data;

  const smtpHost = process.env.SMTP_HOST ;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_MAIL; // vaiakshindustries@gmail.com
  const smtpPass = process.env.NODE_MAILER_PASSWORD; // Google App Password
  const toMail = process.env.TO_MAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !toMail) {
    console.error('Missing SMTP environment variables');
    return { success: false, message: 'Server configuration error.' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // 1. Mail to YOU (Notification)
  const mailToOwner = {
    from: `"Portfolio Contact Form" <${smtpUser}>`,
    to: toMail,
    replyTo: `"${name}" <${senderMail}>`,
    subject: `[Portfolio] ${subject}`,
    text: `New Portfolio Message\n\nFrom: ${name} (${senderMail})\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 580px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #0d9488; margin-top: 0;">New Portfolio Message</h2>
        <p><strong>From:</strong> ${name} (&lt;${senderMail}&gt;)</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
      </div>
    `,
  };

  // 2. Mail to USER (Confirmation) - Cleaned for Spam Filters
  const mailToSender = {
    from: `"Akshat Kumar Sinha" <${smtpUser}>`,
    to: senderMail,
    // CRITICAL: Avoid starting subject with "Re:" on automated first-touch emails
    subject: `Thank you for reaching out, ${name}!`,
    headers: {
      'X-Entity-Ref-ID': `portfolio-ack-${Date.now()}`,
    },
    text: `Hello ${name},\n\nThank you for reaching out! I have received your message regarding "${subject}".\n\nI will review your message and get back to you as soon as possible.\n\nBest regards,\nAkshat Kumar Sinha\nSoftware & Mobile Engineer`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 580px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #0f172a; margin-top: 0;">Thank You for Reaching Out!</h2>
        <p style="font-size: 15px; color: #334155;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 15px; color: #334155; line-height: 1.6;">I have successfully received your message regarding <strong>"${subject}"</strong> and will get back to you as soon as possible.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 14px; font-weight: bold; color: #0f172a; margin: 0;">Akshat Kumar Sinha</p>
        <p style="font-size: 12px; color: #64748b; margin: 2px 0 0 0;">Software & Mobile Engineer</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);

    return {
      success: true,
      message: 'Message sent! Check your inbox for confirmation.',
    };
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return {
      success: false,
      message: 'Unable to send message. Please try again later.',
    };
  }
}
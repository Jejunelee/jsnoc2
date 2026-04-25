import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend('re_PJeQ3Qzd_LcEVHr8Cp64iowvkr9QAg9S4');

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { company, name, phone, email, message, captchaInput, captchaCode } = body;

    // Server-side CAPTCHA validation (for security)
    if (!captchaInput || !captchaCode || 
        captchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid CAPTCHA code' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = `
      New Contact Form Submission
      
      Company: ${company || 'Not provided'}
      Name: ${name}
      Phone: ${phone || 'Not provided'}
      Email: ${email}
      
      Message:
      ${message}
      
      ---
      Sent from JS Network Operations Contact Form
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E90FF; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1E90FF; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #1E90FF; margin-top: 10px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Company:</div>
              <div>${company || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div>${name}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div>${phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            Sent from JS Network Operations Contact Form
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'JS Network Operations <noreply@jsnoc.com>', // You can change this to your verified domain
      to: ['admin@jsnoc.com'], // Your company email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}${company ? ` (${company})` : ''}`,
      text: emailContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Optional: Send auto-reply to the user
    try {
      await resend.emails.send({
        from: 'JS Network Operations <onboarding@resend.dev>',
        to: [email],
        subject: 'Thank you for contacting JS Network Operations',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1E90FF; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Contacting Us!</h2>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to JS Network Operations. We have received your message and will get back to you as soon as possible.</p>
                <p>Here's a summary of your message:</p>
                <div style="background: white; padding: 15px; border-left: 4px solid #1E90FF; margin: 15px 0;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <p>Best regards,<br>JS Network Operations Team</p>
              </div>
              <div class="footer">
                This is an automated response. Please do not reply to this email.
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (autoReplyError) {
      // Don't fail the main request if auto-reply fails
      console.error('Auto-reply error:', autoReplyError);
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
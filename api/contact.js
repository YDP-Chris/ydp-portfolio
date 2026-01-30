import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, projectType } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'YDP Portfolio <noreply@yadkindatapartners.com>',
      to: 'chris@yadkindatapartners.com',
      replyTo: email,
      subject: `Portfolio Inquiry: ${projectType || 'General'} - ${name}`,
      html: `
        <h2>New Portfolio Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `New Portfolio Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType || 'Not specified'}\n\nMessage:\n${message}`
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

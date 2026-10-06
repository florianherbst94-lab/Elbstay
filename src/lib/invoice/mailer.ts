import nodemailer from 'nodemailer';

export async function sendInvoiceEmail(to: string, invoiceNumber: string, reservationCode: string, pdfBuffer: Buffer) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  if (!host || !user || !pass) {
    throw new Error('SMTP credentials are not configured in environment variables.');
  }

  const transporter = nodemailer.createTransport({
    host: host,
    port: 587, // Or whatever your port is
    secure: false, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"Elbstay" <${user}>`,
    to: to,
    subject: `Ihre Rechnung für Ihren Aufenthalt bei Elbstay – ${invoiceNumber}`,
    text: `Guten Tag,

anbei erhalten Sie die Rechnung für Ihren Aufenthalt bei Elbstay.

Rechnungsnummer: ${invoiceNumber}
Buchungsreferenz: ${reservationCode || '-'}

Vielen Dank für Ihren Aufenthalt.

Viele Grüße
Ihr Elbstay-Team`,
    attachments: [
      {
        filename: `Elbstay_Rechnung_${invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

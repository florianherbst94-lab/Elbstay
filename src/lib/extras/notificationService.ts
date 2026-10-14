import nodemailer from 'nodemailer';
import prisma from '../prisma';

export async function sendExtraNotificationEmail(reservationId: string, extraType: 'EARLY_CHECKIN' | 'LATE_CHECKOUT') {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  // We send the notification to the admin/cleaning email configured in Make / SMTP
  const toEmail = 'mail@elbstay.de'; 
  
  if (!host || !user || !pass) {
    console.error('SMTP credentials are not configured. Cannot send extra notification email.');
    return;
  }

  // Fetch reservation details
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { property: true }
  });

  if (!reservation) {
    console.error(`Reservation ${reservationId} not found for email notification.`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: host,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465', 
    auth: {
      user: user,
      pass: pass,
    },
  });

  const extraName = extraType === 'EARLY_CHECKIN' ? 'Früher Check-in (13:00 Uhr)' : 'Später Check-out (12:00 Uhr)';
  const dateFormatted = extraType === 'EARLY_CHECKIN' 
    ? reservation.checkIn.toLocaleDateString('de-DE') 
    : reservation.checkOut.toLocaleDateString('de-DE');

  const subject = `⚠️ Zusatzleistung gebucht: ${extraName} für ${reservation.property.name}`;
  
  const text = `Hallo Team,

es wurde soeben eine kostenpflichtige Zusatzleistung für eine Buchung bestätigt.

Apartment: ${reservation.property.name}
Leistung: ${extraName}
Datum: ${dateFormatted}
Reservierungscode: ${reservation.code || '-'}
Gast: ${reservation.guestName || 'Unbekannt'}

Bitte passt die Reinigungsplanung entsprechend an.

Viele Grüße
Elbstay Automatisierung`;

  const mailOptions = {
    from: `"Elbstay Extras" <${process.env.SMTP_FROM || user}>`,
    to: toEmail,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent for extra ${extraType} on reservation ${reservationId}`);
  } catch (error) {
    console.error('Failed to send extra notification email:', error);
  }
}

import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  reservationCode: string | null;
  bookingPlatform: string | null;
  serviceStartDate: Date | null;
  serviceEndDate: Date | null;
  
  recipient: {
    name: string;
    companyName?: string | null;
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };

  settings: {
    companyName: string;
    street: string;
    postalCode: string;
    city: string;
    taxNumber: string | null;
    vatId: string | null;
    iban: string | null;
    bankName: string | null;
    email: string | null;
    website: string | null;
    defaultPaymentNote: string | null;
  };

  items: Array<{
    description: string;
    quantity: number;
    unitPriceCent: number;
    taxRate: number;
    totalNetCent: number;
    totalTaxCent: number;
    totalGrossCent: number;
  }>;

  totals: {
    net: number;
    tax: number;
    gross: number;
  };
  
  isDraft: boolean;
  invoiceReference?: string | null;
  invoiceNote?: string | null;
}

export function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      // ---- Header ----
      doc.fontSize(20).font('Helvetica-Bold').text(data.settings.companyName, 50, 50);
      
      doc.fontSize(10).font('Helvetica')
        .text(`${data.settings.street}, ${data.settings.postalCode} ${data.settings.city}`, 50, 75);

      // Draft Watermark
      if (data.isDraft) {
        doc.save();
        doc.rotate(45, { origin: [300, 400] });
        doc.fontSize(60).fillColor('#FF0000').opacity(0.1).text('ENTWURF - KEINE RECHNUNG', 100, 400);
        doc.restore();
      }

      // ---- Recipient Address ----
      doc.fontSize(10).fillColor('#000000').font('Helvetica');
      let y = 130;
      if (data.recipient.companyName) {
        doc.text(data.recipient.companyName, 50, y);
        y += 15;
      }
      doc.text(data.recipient.name, 50, y);
      doc.text(data.recipient.street, 50, y + 15);
      doc.text(`${data.recipient.postalCode} ${data.recipient.city}`, 50, y + 30);
      doc.text(data.recipient.country, 50, y + 45);

      // ---- Invoice Meta Info ----
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text(`Rechnung Nr.:`, 350, 130);
      doc.text(`Rechnungsdatum:`, 350, 145);
      if (data.reservationCode) doc.text(`Buchungsreferenz:`, 350, 160);
      if (data.bookingPlatform) doc.text(`Plattform:`, 350, 175);
      
      doc.font('Helvetica');
      doc.text(data.invoiceNumber, 450, 130);
      doc.text(format(data.invoiceDate, 'dd.MM.yyyy'), 450, 145);
      if (data.reservationCode) doc.text(data.reservationCode, 450, 160);
      if (data.bookingPlatform) doc.text(data.bookingPlatform, 450, 175);

      if (data.serviceStartDate && data.serviceEndDate) {
        doc.font('Helvetica-Bold').text('Leistungszeitraum:', 50, 240);
        doc.font('Helvetica').text(`${format(data.serviceStartDate, 'dd.MM.yyyy')} bis ${format(data.serviceEndDate, 'dd.MM.yyyy')}`, 170, 240);
      }

      // ---- Title ----
      doc.fontSize(16).font('Helvetica-Bold').text(`Rechnung`, 50, 280);

      // ---- Table Header ----
      let tableTop = 320;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Pos.', 50, tableTop);
      doc.text('Beschreibung', 90, tableTop);
      doc.text('Menge', 300, tableTop);
      doc.text('Einzelpreis', 360, tableTop);
      doc.text('MwSt.', 430, tableTop);
      doc.text('Gesamt', 490, tableTop);
      
      doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

      // ---- Table Rows ----
      let rowTop = tableTop + 25;
      doc.font('Helvetica');
      
      data.items.forEach((item, index) => {
        doc.text((index + 1).toString(), 50, rowTop);
        doc.text(item.description, 90, rowTop, { width: 200 });
        doc.text(item.quantity.toString(), 300, rowTop);
        doc.text(`${(item.unitPriceCent / 100).toFixed(2)} €`, 360, rowTop);
        doc.text(`${item.taxRate}%`, 430, rowTop);
        doc.text(`${(item.totalGrossCent / 100).toFixed(2)} €`, 490, rowTop);
        
        rowTop += 20;
      });

      doc.moveTo(50, rowTop + 5).lineTo(550, rowTop + 5).stroke();

      // ---- Totals ----
      rowTop += 15;
      doc.font('Helvetica-Bold');
      doc.text('Zwischensumme netto:', 350, rowTop);
      doc.font('Helvetica').text(`${(data.totals.net / 100).toFixed(2)} €`, 490, rowTop);
      
      rowTop += 15;
      doc.font('Helvetica-Bold').text('Mehrwertsteuer:', 350, rowTop);
      doc.font('Helvetica').text(`${(data.totals.tax / 100).toFixed(2)} €`, 490, rowTop);
      
      rowTop += 15;
      doc.font('Helvetica-Bold').text('Gesamtbetrag brutto:', 350, rowTop);
      doc.text(`${(data.totals.gross / 100).toFixed(2)} €`, 490, rowTop);

      // ---- Notes ----
      let notesTop = rowTop + 50;
      doc.font('Helvetica');
      if (data.invoiceReference) {
        doc.text(`Ihre Referenz / Kostenstelle: ${data.invoiceReference}`, 50, notesTop);
        notesTop += 20;
      }
      
      if (data.settings.defaultPaymentNote) {
        doc.text(data.settings.defaultPaymentNote, 50, notesTop, { width: 500 });
        notesTop += 30;
      }

      if (data.invoiceNote) {
        doc.text(`Anmerkungen: ${data.invoiceNote}`, 50, notesTop, { width: 500 });
      }

      // ---- Footer ----
      const footerTop = 750;
      doc.fontSize(8).fillColor('#666666');
      doc.moveTo(50, footerTop).lineTo(550, footerTop).stroke('#cccccc');
      
      doc.text(data.settings.companyName, 50, footerTop + 10);
      doc.text(`${data.settings.street}, ${data.settings.postalCode} ${data.settings.city}`, 50, footerTop + 20);
      
      if (data.settings.email) doc.text(`Email: ${data.settings.email}`, 250, footerTop + 10);
      if (data.settings.website) doc.text(`Web: ${data.settings.website}`, 250, footerTop + 20);
      
      if (data.settings.vatId) doc.text(`USt-IdNr.: ${data.settings.vatId}`, 400, footerTop + 10);
      if (data.settings.iban) doc.text(`IBAN: ${data.settings.iban}`, 400, footerTop + 20);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

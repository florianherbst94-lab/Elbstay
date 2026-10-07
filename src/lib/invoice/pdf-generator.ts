import PDFDocument from 'pdfkit';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';

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
      const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      // Colors matching Elbstay Design
      const primaryColor = '#526343'; // Olive green from tailwind
      const secondaryColor = '#e3d5ca'; // Beige
      const textColor = '#2d2d2d';
      const mutedColor = '#6b7280';

      // Load Logo
      let logoBuffer = null;
      try {
        const logoPath = path.join(process.cwd(), 'public', 'images', 'elbstay-logo-official.png');
        logoBuffer = fs.readFileSync(logoPath);
      } catch (e) {
        console.log("Logo not found or cannot be read in this environment.");
      }

      // ---- Header (Centered) ----
      let currentY = 50;
      
      if (logoBuffer) {
        // Logo centered (A4 width is 595.28 points)
        doc.image(logoBuffer, (595.28 - 150) / 2, currentY, { width: 150 });
        currentY += 60;
      } else {
        doc.fontSize(24).font('Helvetica-Bold').fillColor(primaryColor).text(data.settings.companyName, { align: 'center' });
        currentY += 30;
      }

      // Add a small divider line under logo
      doc.moveTo(250, currentY).lineTo(345, currentY).strokeColor(primaryColor).lineWidth(1).stroke();
      currentY += 20;

      // Draft Watermark
      if (data.isDraft) {
        doc.save();
        doc.rotate(45, { origin: [300, 400] });
        doc.fontSize(70).fillColor('#FF0000').opacity(0.08).text('ENTWURF', 150, 400);
        doc.restore();
      }

      // ---- Two Column Layout (Recipient & Invoice Details) ----
      currentY += 20;
      const leftColX = 50;
      const rightColX = 350;

      // Small sender return address above recipient
      doc.fontSize(7).font('Helvetica').fillColor(mutedColor);
      doc.text(`${data.settings.companyName} - ${data.settings.street} - ${data.settings.postalCode} ${data.settings.city}`, leftColX, currentY);
      currentY += 10;

      // Recipient Address
      doc.fontSize(10).fillColor(textColor).font('Helvetica');
      let leftY = currentY;
      if (data.recipient.companyName) {
        doc.font('Helvetica-Bold').text(data.recipient.companyName, leftColX, leftY);
        doc.font('Helvetica');
        leftY += 14;
      }
      doc.text(data.recipient.name, leftColX, leftY);
      doc.text(data.recipient.street, leftColX, leftY + 14);
      doc.text(`${data.recipient.postalCode} ${data.recipient.city}`, leftColX, leftY + 28);
      doc.text(data.recipient.country, leftColX, leftY + 42);

      // Invoice Meta Info (Right side)
      let rightY = currentY - 10;
      doc.fontSize(18).font('Helvetica-Bold').fillColor(primaryColor).text(`RECHNUNG`, rightColX, rightY);
      rightY += 25;
      
      doc.fontSize(9).fillColor(mutedColor).font('Helvetica');
      const rightLabelX = rightColX;
      const rightValueX = rightColX + 100;

      const addMetaRow = (label: string, value: string) => {
        doc.font('Helvetica').fillColor(mutedColor).text(label, rightLabelX, rightY);
        doc.font('Helvetica-Bold').fillColor(textColor).text(value, rightValueX, rightY, { width: 100, align: 'right' });
        rightY += 14;
      };

      addMetaRow("Rechnung Nr.", data.invoiceNumber);
      addMetaRow("Datum", format(data.invoiceDate, 'dd.MM.yyyy'));
      
      if (data.reservationCode) addMetaRow("Buchungscode", data.reservationCode);
      if (data.bookingPlatform) addMetaRow("Plattform", data.bookingPlatform);
      if (data.invoiceReference) addMetaRow("Referenz", data.invoiceReference);

      currentY = Math.max(leftY + 60, rightY + 20);

      // ---- Table Header ----
      currentY += 30;
      
      // Header Background
      doc.rect(50, currentY, 495.28, 25).fill(primaryColor);
      
      const tableTop = currentY + 7;
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff');
      doc.text('Pos.', 60, tableTop);
      doc.text('Beschreibung', 100, tableTop);
      doc.text('MwSt.', 380, tableTop);
      doc.text('Nettobetrag', 430, tableTop);
      doc.text('Gesamt', 490, tableTop, { width: 45, align: 'right' });
      
      // ---- Table Rows ----
      let rowTop = currentY + 25;
      
      data.items.forEach((item, index) => {
        // Alternating row background for elegance
        if (index % 2 === 0) {
          doc.rect(50, rowTop, 495.28, 20).fill('#f9fafb');
        }

        doc.font('Helvetica').fillColor(textColor).fontSize(9);
        doc.text((index + 1).toString(), 60, rowTop + 5);
        doc.text(item.description, 100, rowTop + 5, { width: 270 });
        doc.text(`${item.taxRate}%`, 380, rowTop + 5);
        doc.text(`${(item.totalNetCent / 100).toFixed(2)} €`, 430, rowTop + 5);
        
        doc.font('Helvetica-Bold');
        doc.text(`${(item.totalGrossCent / 100).toFixed(2)} €`, 490, rowTop + 5, { width: 45, align: 'right' });
        
        rowTop += 20;
      });

      doc.moveTo(50, rowTop).lineTo(545.28, rowTop).strokeColor('#e5e7eb').lineWidth(1).stroke();

      // ---- Totals Section ----
      rowTop += 20;
      const totalsLeftX = 350;
      const totalsRightX = 450;
      
      doc.fontSize(9).font('Helvetica').fillColor(mutedColor);
      doc.text('Zwischensumme (Netto):', totalsLeftX, rowTop);
      doc.font('Helvetica').fillColor(textColor).text(`${(data.totals.net / 100).toFixed(2)} €`, totalsRightX, rowTop, { width: 85, align: 'right' });
      
      rowTop += 15;
      // Tax grouping by rate would be better, but we just show total tax here
      doc.font('Helvetica').fillColor(mutedColor).text('zzgl. Umsatzsteuer:', totalsLeftX, rowTop);
      doc.font('Helvetica').fillColor(textColor).text(`${(data.totals.tax / 100).toFixed(2)} €`, totalsRightX, rowTop, { width: 85, align: 'right' });
      
      rowTop += 15;
      
      // Gross Total - Big & Bold
      doc.rect(totalsLeftX - 10, rowTop, 205.28, 25).fill(secondaryColor);
      doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor);
      doc.text('Rechnungsbetrag:', totalsLeftX, rowTop + 7);
      doc.text(`${(data.totals.gross / 100).toFixed(2)} €`, totalsRightX, rowTop + 7, { width: 85, align: 'right' });

      // ---- Notes / Payment Info ----
      let notesTop = rowTop + 50;
      
      if (data.serviceStartDate && data.serviceEndDate) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(textColor).text('Leistungszeitraum:', 50, notesTop);
        doc.font('Helvetica').fillColor(mutedColor).text(`${format(data.serviceStartDate, 'dd.MM.yyyy')} - ${format(data.serviceEndDate, 'dd.MM.yyyy')}`, 150, notesTop);
        notesTop += 15;
      }
      
      if (data.settings.defaultPaymentNote) {
        notesTop += 5;
        doc.fontSize(9).font('Helvetica-Bold').fillColor(textColor).text('Zahlungshinweis:', 50, notesTop);
        notesTop += 12;
        doc.font('Helvetica').fillColor(mutedColor).text(data.settings.defaultPaymentNote, 50, notesTop, { width: 400 });
        notesTop += 30;
      }

      if (data.invoiceNote) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(textColor).text('Anmerkung:', 50, notesTop);
        notesTop += 12;
        doc.font('Helvetica').fillColor(mutedColor).text(data.invoiceNote, 50, notesTop, { width: 400 });
      }

      // ---- Footer (Fixed at bottom) ----
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        const footerTop = 750;
        
        doc.moveTo(50, footerTop - 10).lineTo(545.28, footerTop - 10).strokeColor('#e5e7eb').lineWidth(1).stroke();
        
        doc.fontSize(7).font('Helvetica').fillColor(mutedColor);
        
        // Column 1: Company & Address
        doc.font('Helvetica-Bold').text(data.settings.companyName, 50, footerTop);
        doc.font('Helvetica');
        doc.text(data.settings.street, 50, footerTop + 10);
        doc.text(`${data.settings.postalCode} ${data.settings.city}`, 50, footerTop + 20);
        
        // Column 2: Contact
        doc.font('Helvetica-Bold').text("Kontakt", 200, footerTop);
        doc.font('Helvetica');
        if (data.settings.email) doc.text(data.settings.email, 200, footerTop + 10);
        if (data.settings.website) doc.text(data.settings.website, 200, footerTop + 20);
        
        // Column 3: Tax
        doc.font('Helvetica-Bold').text("Steuerdaten", 350, footerTop);
        doc.font('Helvetica');
        if (data.settings.vatId) doc.text(`USt-IdNr.: ${data.settings.vatId}`, 350, footerTop + 10);
        if (data.settings.taxNumber) doc.text(`Steuernummer: ${data.settings.taxNumber}`, 350, footerTop + 20);
        
        // Column 4: Bank
        doc.font('Helvetica-Bold').text("Bankverbindung", 450, footerTop);
        doc.font('Helvetica');
        if (data.settings.bankName) doc.text(data.settings.bankName, 450, footerTop + 10);
        if (data.settings.iban) doc.text(`IBAN: ${data.settings.iban}`, 450, footerTop + 20);
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

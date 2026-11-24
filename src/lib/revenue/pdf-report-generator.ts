import PDFDocument from 'pdfkit';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateBankReportPdf(reportData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      const primaryColor = '#526343'; 
      const secondaryColor = '#e3d5ca'; 
      const textColor = '#2d2d2d';
      const mutedColor = '#6b7280';
      const successColor = '#10b981';
      const dangerColor = '#ef4444';

      let logoBuffer = null;
      try {
        const logoPath = path.join(process.cwd(), 'public', 'images', 'elbstay-logo-official.png');
        logoBuffer = fs.readFileSync(logoPath);
      } catch (e) {
        console.log("Logo not found");
      }

      // Helper function for page headers
      const addPageHeader = (title: string, subtitle?: string) => {
        doc.addPage();
        if (logoBuffer) {
           doc.image(logoBuffer, 50, 40, { width: 100 });
        }
        doc.fontSize(16).font('Helvetica-Bold').fillColor(primaryColor).text(title, 50, 100);
        if (subtitle) {
           doc.fontSize(10).font('Helvetica').fillColor(mutedColor).text(subtitle, 50, 120);
        }
        doc.moveTo(50, 140).lineTo(545, 140).strokeColor(secondaryColor).lineWidth(2).stroke();
        return 160; // Returns next Y position
      };

      const formatEuro = (cents: number) => `€ ${(cents/100).toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      const formatPercent = (val: number) => `${val.toFixed(1)}%`;

      // ==========================================
      // PAGE 1: DECKBLATT
      // ==========================================
      let currentY = 200;
      
      if (logoBuffer) {
        doc.image(logoBuffer, (595.28 - 200) / 2, 120, { width: 200 });
      }

      doc.fontSize(28).font('Helvetica-Bold').fillColor(primaryColor).text('Wirtschaftlichkeitsanalyse', 50, 250, { align: 'center' });
      doc.fontSize(20).font('Helvetica').fillColor(textColor).text('& Finanzreport', 50, 285, { align: 'center' });
      
      doc.moveTo(200, 330).lineTo(395, 330).strokeColor(primaryColor).lineWidth(2).stroke();

      doc.fontSize(14).font('Helvetica-Bold').fillColor(textColor).text('Ferienwohnungsportfolio Elbstay', 50, 380, { align: 'center' });
      
      doc.fontSize(12).font('Helvetica').fillColor(mutedColor);
      const periodStr = `${format(reportData.period.start, 'MMMM yyyy')} - ${format(reportData.period.end, 'MMMM yyyy')}`;
      doc.text(`Berichtszeitraum: ${periodStr}`, 50, 420, { align: 'center' });
      doc.text(`Erstellt am: ${format(new Date(), 'dd.MM.yyyy')}`, 50, 440, { align: 'center' });

      doc.fontSize(10).fillColor(dangerColor).text('Vertrauliche Unternehmensunterlagen', 50, 700, { align: 'center' });

      // ==========================================
      // PAGE 2: EXECUTIVE SUMMARY
      // ==========================================
      currentY = addPageHeader('Executive Summary', 'Zusammenfassung der wirtschaftlichen Entwicklung');
      
      doc.fontSize(12).font('Helvetica-Bold').fillColor(textColor).text('Portfolio Übersicht', 50, currentY);
      currentY += 25;

      const drawKpiCard = (x: number, y: number, title: string, value: string, subtitle?: string, isPositive?: boolean) => {
         doc.rect(x, y, 155, 70).fillAndStroke('#f9fafb', '#e5e7eb');
         doc.fontSize(9).font('Helvetica').fillColor(mutedColor).text(title, x + 10, y + 10);
         
         let valColor = textColor;
         if (isPositive === true) valColor = successColor;
         if (isPositive === false) valColor = dangerColor;

         doc.fontSize(14).font('Helvetica-Bold').fillColor(valColor).text(value, x + 10, y + 28);
         if (subtitle) {
            doc.fontSize(8).font('Helvetica').fillColor(mutedColor).text(subtitle, x + 10, y + 50);
         }
      };

      const overall = reportData.overall;
      
      drawKpiCard(50, currentY, 'Gesamtumsatz (Netto)', formatEuro(overall.netRevenueCent), `${reportData.period.months.length} Monate`);
      drawKpiCard(215, currentY, 'Gesamtausgaben (Netto)', formatEuro(overall.netTotalCostsCent), 'Fix & Variabel');
      drawKpiCard(380, currentY, 'Operativer Gewinn', formatEuro(overall.profitCent), 'Vor Finanzierung', overall.profitCent >= 0);
      
      currentY += 85;

      drawKpiCard(50, currentY, 'Gewinnmarge', formatPercent(overall.margin));
      drawKpiCard(215, currentY, 'Ø Auslastung', formatPercent(overall.occupancy), `${overall.occupiedNights} Nächte belegt`);
      drawKpiCard(380, currentY, 'RevPAR (Netto)', formatEuro(overall.revParCent), 'Umsatz pro verfügb. Nacht');

      currentY += 100;

      doc.fontSize(12).font('Helvetica-Bold').fillColor(textColor).text('Zusammensetzung der Kosten', 50, currentY);
      currentY += 25;

      // Simple cost breakdown table
      doc.fontSize(10).font('Helvetica-Bold').fillColor(mutedColor);
      doc.text('Kostenart', 50, currentY);
      doc.text('Betrag (Netto)', 380, currentY, { width: 100, align: 'right' });
      doc.text('Anteil', 490, currentY, { width: 55, align: 'right' });
      currentY += 15;
      doc.moveTo(50, currentY).lineTo(545, currentY).strokeColor('#e5e7eb').lineWidth(1).stroke();
      currentY += 10;

      const addCostRow = (label: string, amount: number) => {
         const percentage = overall.netTotalCostsCent > 0 ? (amount / overall.netTotalCostsCent) * 100 : 0;
         doc.fontSize(10).font('Helvetica').fillColor(textColor);
         doc.text(label, 50, currentY);
         doc.text(formatEuro(amount), 380, currentY, { width: 100, align: 'right' });
         doc.text(formatPercent(percentage), 490, currentY, { width: 55, align: 'right' });
         currentY += 20;
      };

      addCostRow('Fixkosten (z.B. Miete, Internet)', overall.netFixedCostsCent);
      addCostRow('Variable Kosten (z.B. Reinigung, Provisionen)', overall.netVariableCostsCent);
      
      doc.moveTo(380, currentY).lineTo(545, currentY).strokeColor('#e5e7eb').lineWidth(1).stroke();
      currentY += 10;
      
      doc.font('Helvetica-Bold');
      doc.text('Gesamtausgaben', 50, currentY);
      doc.text(formatEuro(overall.netTotalCostsCent), 380, currentY, { width: 100, align: 'right' });
      doc.text('100.0%', 490, currentY, { width: 55, align: 'right' });


      // ==========================================
      // PAGE 3: PORTFOLIO MONATSÜBERSICHT
      // ==========================================
      currentY = addPageHeader('Gesamtwirtschaftlichkeit', 'Monatliche Einnahmen, Ausgaben und Gewinne');

      doc.rect(50, currentY, 495, 20).fill(primaryColor);
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff');
      
      const tableHeaders = ['Monat', 'Umsatz', 'Fixkosten', 'Var.Kosten', 'Gewinn', 'Marge', 'Auslast.'];
      const colWidths = [60, 80, 80, 80, 80, 50, 65];
      let currentX = 55;
      
      tableHeaders.forEach((header, i) => {
        doc.text(header, currentX, currentY + 6, { width: colWidths[i], align: i > 0 ? 'right' : 'left' });
        currentX += colWidths[i];
      });
      
      currentY += 25;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reportData.monthlyPortfolio.forEach((row: any, index: number) => {
         if (index % 2 === 0) doc.rect(50, currentY - 5, 495, 20).fill('#f9fafb');
         
         doc.fontSize(9).font('Helvetica').fillColor(textColor);
         currentX = 55;
         
         doc.text(row.month, currentX, currentY); currentX += colWidths[0];
         doc.text(formatEuro(row.stats.netRevenueCent), currentX, currentY, { width: colWidths[1], align: 'right' }); currentX += colWidths[1];
         doc.fillColor(mutedColor);
         doc.text(formatEuro(row.stats.netFixedCostsCent), currentX, currentY, { width: colWidths[2], align: 'right' }); currentX += colWidths[2];
         doc.text(formatEuro(row.stats.netVariableCostsCent), currentX, currentY, { width: colWidths[3], align: 'right' }); currentX += colWidths[3];
         
         const isProfitable = row.stats.profitCent >= 0;
         doc.font('Helvetica-Bold').fillColor(isProfitable ? successColor : dangerColor);
         doc.text(formatEuro(row.stats.profitCent), currentX, currentY, { width: colWidths[4], align: 'right' }); currentX += colWidths[4];
         
         doc.font('Helvetica').fillColor(textColor);
         doc.text(formatPercent(row.stats.margin), currentX, currentY, { width: colWidths[5], align: 'right' }); currentX += colWidths[5];
         doc.text(formatPercent(row.stats.occupancy), currentX, currentY, { width: colWidths[6], align: 'right' });
         
         currentY += 20;

         if (currentY > 750) {
            currentY = addPageHeader('Gesamtwirtschaftlichkeit (Fortsetzung)', 'Monatliche Einnahmen, Ausgaben und Gewinne');
         }
      });

      // ==========================================
      // PAGE 4: PORTFOLIOVERGLEICH
      // ==========================================
      currentY = addPageHeader('Portfoliovergleich', 'Vergleich sämtlicher Ferienwohnungen');

      doc.rect(50, currentY, 495, 20).fill(primaryColor);
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff');
      
      const pvHeaders = ['Ferienwohnung', 'Anteil', 'Umsatz', 'Gesamtkosten', 'Gewinn', 'Marge', 'Auslast.'];
      const pvColWidths = [120, 40, 70, 80, 75, 45, 65];
      currentX = 55;
      
      pvHeaders.forEach((header, i) => {
        doc.text(header, currentX, currentY + 6, { width: pvColWidths[i], align: i > 0 ? 'right' : 'left' });
        currentX += pvColWidths[i];
      });
      
      currentY += 25;

      const sortedProps = [...reportData.propertiesPerformance].sort((a, b) => b.stats.profitCent - a.stats.profitCent);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sortedProps.forEach((prop: any, index: number) => {
         if (index % 2 === 0) doc.rect(50, currentY - 5, 495, 20).fill('#f9fafb');
         
         doc.fontSize(9).font('Helvetica').fillColor(textColor);
         currentX = 55;
         
         // Truncate name
         const name = prop.propertyName.length > 25 ? prop.propertyName.substring(0, 22) + '...' : prop.propertyName;
         
         const revShare = overall.netRevenueCent > 0 ? (prop.stats.netRevenueCent / overall.netRevenueCent) * 100 : 0;

         doc.text(name, currentX, currentY); currentX += pvColWidths[0];
         doc.fillColor(mutedColor).text(formatPercent(revShare), currentX, currentY, { width: pvColWidths[1], align: 'right' }); currentX += pvColWidths[1];
         doc.fillColor(textColor).text(formatEuro(prop.stats.netRevenueCent), currentX, currentY, { width: pvColWidths[2], align: 'right' }); currentX += pvColWidths[2];
         doc.fillColor(mutedColor).text(formatEuro(prop.stats.netTotalCostsCent), currentX, currentY, { width: pvColWidths[3], align: 'right' }); currentX += pvColWidths[3];
         
         const isProfitable = prop.stats.profitCent >= 0;
         doc.font('Helvetica-Bold').fillColor(isProfitable ? successColor : dangerColor);
         doc.text(formatEuro(prop.stats.profitCent), currentX, currentY, { width: pvColWidths[4], align: 'right' }); currentX += pvColWidths[4];
         
         doc.font('Helvetica').fillColor(textColor);
         doc.text(formatPercent(prop.stats.margin), currentX, currentY, { width: pvColWidths[5], align: 'right' }); currentX += pvColWidths[5];
         doc.text(formatPercent(prop.stats.occupancy), currentX, currentY, { width: pvColWidths[6], align: 'right' });
         
         currentY += 20;

         if (currentY > 750) {
            currentY = addPageHeader('Portfoliovergleich (Fortsetzung)', 'Vergleich sämtlicher Ferienwohnungen');
         }
      });


      // ==========================================
      // PAGE 5+: EINZELOBJEKTANALYSEN
      // ==========================================
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sortedProps.forEach((prop: any) => {
         currentY = addPageHeader(`Einzelobjekt: ${prop.propertyName}`, 'Wirtschaftlichkeitsübersicht');
         
         // KPIs for property
         drawKpiCard(50, currentY, 'Umsatz (Netto)', formatEuro(prop.stats.netRevenueCent));
         drawKpiCard(215, currentY, 'Operativer Gewinn', formatEuro(prop.stats.profitCent), 'Vor Finanzierung', prop.stats.profitCent >= 0);
         drawKpiCard(380, currentY, 'Gewinnmarge', formatPercent(prop.stats.margin));
         
         currentY += 100;

         doc.fontSize(12).font('Helvetica-Bold').fillColor(textColor).text('Monatliche Entwicklung', 50, currentY);
         currentY += 20;

         doc.rect(50, currentY, 495, 20).fill(primaryColor);
         doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff');
         
         const eoHeaders = ['Monat', 'Umsatz', 'Kosten', 'Gewinn', 'Auslastung'];
         const eoColWidths = [100, 100, 100, 100, 95];
         currentX = 55;
         
         eoHeaders.forEach((header, i) => {
           doc.text(header, currentX, currentY + 6, { width: eoColWidths[i], align: i > 0 ? 'right' : 'left' });
           currentX += eoColWidths[i];
         });
         
         currentY += 25;

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         prop.monthlyDetails.forEach((row: any, index: number) => {
            if (index % 2 === 0) doc.rect(50, currentY - 5, 495, 20).fill('#f9fafb');
            
            doc.fontSize(9).font('Helvetica').fillColor(textColor);
            currentX = 55;
            
            const monthTotalCosts = row.netFixedCostsCent + row.netVariableCostsCent;
            const monthProfit = row.netRevenueCent - monthTotalCosts;

            doc.text(row.month, currentX, currentY); currentX += eoColWidths[0];
            doc.text(formatEuro(row.netRevenueCent), currentX, currentY, { width: eoColWidths[1], align: 'right' }); currentX += eoColWidths[1];
            doc.fillColor(mutedColor).text(formatEuro(monthTotalCosts), currentX, currentY, { width: eoColWidths[2], align: 'right' }); currentX += eoColWidths[2];
            
            doc.font('Helvetica-Bold').fillColor(monthProfit >= 0 ? successColor : dangerColor);
            doc.text(formatEuro(monthProfit), currentX, currentY, { width: eoColWidths[3], align: 'right' }); currentX += eoColWidths[3];
            
            doc.font('Helvetica').fillColor(textColor);
            const occ = row.availableNights > 0 ? (row.occupiedNights / row.availableNights) * 100 : 0;
            doc.text(formatPercent(occ), currentX, currentY, { width: eoColWidths[4], align: 'right' });
            
            currentY += 20;

            if (currentY > 750) {
               currentY = addPageHeader(`Einzelobjekt: ${prop.propertyName} (Fortsetzung)`);
            }
         });
      });

      // Footer numbering
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(8).font('Helvetica').fillColor(mutedColor).text(
          `Seite ${i + 1} von ${pages.count}`,
          50, 780, { align: 'center', width: 495 }
        );
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import { StudentReportType } from '../deliberation/types';

@Injectable()
export class PdfService {
  async createPDF(data: StudentReportType) {
    const doc = new PDFDocument({ size: 'A4' });
    doc.text(`Student Report`, {
      font: 'Helvetica',
      size: 24,
      align: 'center',
    });

    doc.text(`Name: ${data.name}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Matricule: ${data.matricule}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Promotion: ${data.promotion}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Field: ${data.field}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    for (const course of data.courses) {
      doc.text(`${course.name} - ${course.credits} - ${course.grade}`, {
        font: 'Helvetica',
        size: 12,
        align: 'center',
      });
    }

    doc.text(`Percentage: ${data.percentage}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Mention: ${data.mention}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Earned Credits: ${data.earnedCredits}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Attempted Credits: ${data.attemptedCredits}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Total Hours: ${data.totalHours}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.text(`Failures: ${data.failures}`, {
      font: 'Helvetica',
      size: 16,
      align: 'center',
    });

    doc.end();
    doc.pipe(
      fs.createWriteStream(
        `src/pdf/documents/${data.name}-${data.field}-${data.promotion}.pdf`,
      ),
    );
  }
}

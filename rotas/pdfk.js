PDFDocument = require('pdfkit');

function buildPdf(dataCallback, endCallback) {
  const doc = new PDFDocument();
  doc.on('data', dataCallback);
  doc.on('end', dataCallback);

  doc.fontSize(25).text('Some Heading');
  doc.end();
}

module.exports = { buildPdf };

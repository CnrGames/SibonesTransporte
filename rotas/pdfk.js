const PDFDocument = require('pdfkit');

function buildPdf() {
  let doc = new PDFDocument();
  /*
  doc.on('data', dataCallback);
  doc.on('end', dataCallback);
*/

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage

  doc.fontSize(25).text('Teste Ben10 Brasileiro');
  // Embed a font, set the font size, and render some text
  doc.fontSize(25).text('Some text with an embedded font!', 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally

  /*doc.image(
    'https://pbs.twimg.com/profile_images/1593729608133795840/F2L6TKCk_400x400.jpg',
    {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
    }
  );*/
  doc.end();
  return doc;
}

module.exports = { buildPdf };

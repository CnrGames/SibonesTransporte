function exTemer(nome, data, preco, destino, imagem) {
  let = temry =
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Recibo</title>

    <style>
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
      }

      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }

      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 40px;
      }

      .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }

        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }

      /** RTL **/
      .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial,
          sans-serif;
      }

      .rtl table {
        text-align: right;
      }

      .rtl table tr td:nth-child(2) {
        text-align: left;
      }
    </style>
  </head>

  <body>
    <div class="invoice-box">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                 ` +
    ` 
                 <img
                    src="${imagem}"
                    style="width: 50%; max-width: 200px"
                  />
                 ` +
    /* <img
                    src="data:image/png;base64,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"
                    style="width: 50%; max-width: 200px"
                  />*/
    `
                </td>

                <td>
                  Fatura #: 123

                  <div id="dataExpira">Criado: ${data}</div>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="2">
            <table>
              <tr>
                <td>
                  <b>Sibas Transporte.Lda</b> , Inc.<br />
                  Rua 1,194 n ° 332<br />
                  Bairro Central, Maputo, Maputo 1100
                </td>

                <td>
                  <b>Nome:</b>
                  <div id="nome">${nome}</div>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading">
          <td>Forma de pagamento</td>

          <td>Online #</td>
        </tr>

        <tr class="details">
          <td>Débito</td>

          <td>1000</td>
        </tr>

        <tr class="heading">
          <td>Item</td>

          <td>Preço</td>
        </tr>

        <tr class="item">
          <td>Viagem a ${destino}</td>

          <td><div id="preco">${preco}</div></td>
        </tr>

        <tr class="total">
          <td></td>

          <td><div id="ptotal">Total: ${preco}Mts</div></td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;

  return temry;
}

module.exports = { exTemer };

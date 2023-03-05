function exTemer(imagem) {
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
                

                </td>

                <td>
                  Fatura #:A1#73746JF

                  <div id="dataExpira">Criado: 30/01/2023</div>

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
                  <div id="nome">Isctem</div>

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
          <td>Bilhete</td>

          <td><div id="preco">15000</div></td>
        </tr>

        <tr class="total">
          <td></td>

          <td><div id="ptotal">Total: 15000Mts</div></td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;

  return temry;
}

module.exports = { exTemer };

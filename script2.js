document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Generate invoice content
    let invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(`
       <html>
       <head>
         <title>Invoice</title>
         <style>
           body {
             font-family: Arial, sans-serif;
             margin: 20px;
           }
           h1, h2 {
             text-align: center;
           }
           table {
             width: 100%;
             border-collapse: collapse;
             margin-top: 20px;
           }
           table, th, td {
             border: 1px solid #ddd;
           }
           th, td {
             padding: 8px;
             text-align: left;
           }
           th {
             background-color: #f4f4f4;
           }
           .total-row {
             font-weight: bold;
           }
           .print-button {
             display: block;
             margin: 20px auto;
             padding: 10px 20px;
             font-size: 16px;
             color: #fff;
             background-color: #007bff;
             border: none;
             border-radius: 4px;
             cursor: pointer;
           }
           .print-button:hover {
             background-color: #0056b3;
           }
         </style>
       </head>
       <body>
         <h1>Invoice</h1>
         <h2>Thank you for your order!</h2>
         <table>
           <thead>
             <tr>
               <th>Item</th>
               <th>Price</th>
               <th>Quantity</th>
               <th>Total</th>
             </tr>
           </thead>
           <tbody>
             ${cart
                 .map(
                     (item) => `
               <tr>
                 <td>${item.name}</td>
                 <td>₹${item.price.toFixed(2)}</td>
                 <td>${item.quantity}</td>
                 <td>₹${(item.price * item.quantity).toFixed(2)}</td>
               </tr>
             `
                 )
                 .join("")}
             <tr class="total-row">
               <td colspan="3">Grand Total</td>
               <td>₹${cart
                   .reduce((acc, item) => acc + item.price * item.quantity, 0)
                   .toFixed(2)}</td>
             </tr>
           </tbody>
         </table>
         <button class="print-button" onclick="window.print()">Print Invoice</button>
       </body>
       </html>
     `);

    invoiceWindow.document.close();
});

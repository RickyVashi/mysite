// paymentRoutes.js

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Product = require('../models/ProductModel');
const nodemailer = require("nodemailer");

const querystring = require("querystring");
const axios = require("axios");

const transporter = nodemailer.createTransport({
  service: 'gmail',
host: "smtp.gmail.com",
port: 587,
secure: false, // Use `true` for port 465, `false` for all other ports
auth: {
  user: "rickyvashi.co20d1@scet.ac.in",
  pass: "mevq xwak tyjm lsxw",
},
});

const sendMail = async (transporter, mailOptions) => {
  try {
      await transporter.sendMail(mailOptions);
      console.log("Mail Sent Successfully");
  } catch (error) {
      console.log("Error sending email:", error);
  }
};





router.post("/getBalance",  async(req,res)=>{
    const { email } = req.body;
    const data = await User.findOne({ email: email });

    res.send(data);
})

router.post("/getOrders",  async(req,res)=>{
  const { email } = req.body;
  const data = await Product.find({ email: email });

  res.send(data);
})

router.post('/placeOrder', async (req, res) => {
  const  orders  = req.body.orders;

  if (!orders || !Array.isArray(orders)) {
    return res.status(400).send('Orders array is required');
  }

  try {
    const orderID = uuidv4()
    for (const order of orders) {
      const newProduct = new Product({
        orderID : orderID,
        email: req.body.email,
        id: order.id,
        title: order.title,
        description: order.description,
        category: order.category,
        price: order.price,
        discountPercentage: order.discountPercentage,
        images: order.images,
        discountedPrice: order.discountedPrice,
        quantity: order.quantity,
      });

      await newProduct.save();
      const data= await User.findOne({email:req.body.email})
  
      if(data){
        data.currentBalance = data.currentBalance - parseInt(req.body.amount) 
        data.save();
      }

      const mailOptions = {
        from: {
          name: 'Ricky Vashi',
          address: 'rickyvashi.co20d1@scet.ac.in',
        },
        to: req.body.email, // Assuming the email to send to is passed in the request body
        subject: 'Order Placed Successfully',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                h1 {
                  color: #333;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                th, td {
                  padding: 10px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                }
                th {
                  background-color: #f8f8f8;
                }
                img {
                  max-width: 100px;
                  height: auto;
                  display: block;
                }
                .thank-you {
                  font-style: italic;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <h1>Order Placed Successfully!</h1>
              <p>Dear Customer,</p>
              <p>Your order has been successfully placed. Below are the details of your order:</p>
              <table>
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(order => `
                    <tr>
                      <td><img src="${order.images[0]}" alt="${order.title}"></td>
                      <td>${order.title}</td>
                      <td>${order.description}</td>
                      <td>${order.category}</td>
                      <td>${order.price}</td>
                      <td>${order.quantity}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <p>Your total amount deducted: ${req.body.amount}</p>
              <p class="thank-you">Thank you for shopping with us!</p>
              <p>Sincerely,<br>Ricky Vashi</p>
            </body>
          </html>
        `,
      };
      
      // Send the email
      // await sendMail(transporter, mailOptions);
      
      
      // Send the email
      await sendMail(transporter, mailOptions);
      

    // Send the OTP email
    // await sendMail(transporter, mailOptions);
    }

    res.send('Orders processed and saved successfully');
  } catch (error) {
    console.error('Error saving orders:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post("/getTransaction",  async(req,res)=>{
    const { email } = req.body;
    const data = await User.findOne({ email: email });

    const transactions = await Transaction.find({user : data.name})

    res.send(transactions);
})

router.post("/process-payment", async (req, res) => {
  const { cardNumber, expirationDate, cvv, amount, user, type } = req.body;  

  try {
    if(type === 'CREDIT'){
        const response = await axios.post("https://x1.cardknox.com/gateway", null, {
      params: {
        xKey: "digitattvadev7abacc4753e84cfabbf537b1455abe5b",
        xVersion: "4.5.8", // or the version you are using
        xCommand: "cc:sale", // Make sure to include the required xCommand parameter
        xCardNum: cardNumber,
        xExp: expirationDate,
        xCVV: cvv,
        xAmount: amount,  
        xSoftwareName: "Ricky",
        xSoftwareVersion: "4.0.0",
        xAllowDuplicate: true, // Enable duplicate transaction handling
      },
    });
    const parsedData = querystring.parse(response.data);
    if (parsedData.xResult=== "A") {
        // Fetch previous payment record
        const data = await User.findOne({ name: user });

  
        if (data) {
          currentBalance = parseFloat(data.currentBalance);
        }
  
        // Save transaction
        const transaction = new Transaction({
          user: user,
          transactionType: type,
          transactionId: parsedData.xRefNum,
          amount: parseFloat(amount),
        });
        await transaction.save();
  
        console.log("Transaction saved:", transaction);
  
        // Save payment
        data.currentBalance = data.currentBalance + parseInt(amount);

        await data.save();
  
        console.log("Payment saved:", data);
  
        // Respond with success message or relevant data
        res.json({ success: true, transactionId: parsedData.xRefNum });
      } else {
        // Respond with error message if authentication fails
        res.status(400).json({ error: "Authentication failed" });
        console.log(querystring.parse(response.data));
      }
    }
    else{
        const data = await User.findOne({ name: user });
        let currentBalance = 0;
  
        if (data) {
          currentBalance = parseFloat(data.currentBalance);
        }

        // Save transaction
        const transaction = new Transaction({
          user: user,
          transactionType: type,
          transactionId: '10021240000',
          amount: parseFloat(amount),
        });
        await transaction.save();
  
        // Save payment
        data.currentBalance = data.currentBalance - parseInt(amount);

        await data.save();
        res.json({ success: true});
    }    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const nodemailer = require("nodemailer");

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

const mailOptions={
    from: {
        name: 'Ricky Vashi',
        address : 'rickyvashi.co20d1@scet.ac.in'
    }, // sender address
    to: ["vk2491638@gmail.com"], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    // attachments:[
    //     {
    //         filename : '',
    //         path : path.join(__dirname, '');
    //     }
    // ]
  }



const sendMail = async (transporter,mailOptions)=>{
    try{
        await transporter.sendMail(mailOptions)
        console.log("Mail Sent Succesfully");
    }catch(error){
        console.log("Error",error)
    }
}

sendMail(transporter,mailOptions)
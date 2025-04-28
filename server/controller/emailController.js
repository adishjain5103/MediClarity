import {Resend} from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
    const { name, email } = req.body;
    try {
      const { data, error } = await resend.emails.send({
        from: 'Your Company kumarshresth2004@gmail.com',
        to: email,
        subject: 'Thank you for contacting MediClarity',
        html: `<h1>Thank You for Contacting MediClarity</h1><p>Dear ${name}, ...</p>`,
      });
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  };
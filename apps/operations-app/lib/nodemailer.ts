import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASS;

if (!email || !emailPass) {
  throw new Error('Email credentials are not set for nodemailer')
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: emailPass,
  },
  secure: process.env.NODE_ENV === 'production',
})

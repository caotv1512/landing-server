import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'caomanhct@gmail.com', // Điền email của bạn
        pass: 'vqvk dbmv rpgz vpbm', // Điền mật khẩu email của bạn
      },
    });
  }

  async sendEmail(formData: any) {
    const { from, toList, subject, name, phone } = formData;
    for (const to of toList) {
      const text = `
      Name: ${name}, 
      SĐT: ${phone}`;
      const mailOptions = {
        from, // Điền email của bạn
        to,
        subject,
        text,
      };

      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email: ', error);
      }
    }
  }
}

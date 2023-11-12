import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() formData: any) {
    // Lấy dữ liệu từ biểu mẫu
    formData = {
      ...formData,
      from: 'abc@gmail.com',
      subject: 'Khách hàng mới:',
      toList: ['caomanhct@gmail.com',"phambangkst@gmail.com", "Trantaitvt2000@gmail.com"] ,
    };
    console.log(formData);

    // const {from, to, subject, name, phone } = formData;

    // Gửi email
    this.emailService.sendEmail(formData);

    // Trả về phản hồi cho người dùng
    return 'Email sent successfully';
  }
}

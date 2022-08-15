import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ContactDto } from '../dtos/contac.dto';
import { CustomEmailDto } from '../dtos/custom-email.dto';
import { RoleEmailsDto } from '../dtos/role-emails.dto';
import { MailsService } from '../services/mails.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailService: MailsService) {}

  @ApiOperation({ summary: 'Send contact emails' })
  @Post('contact')
  async sendContactEmail(@Body() contactDto: ContactDto) {
    console.log(
      '🚀 ~ file: mails.controller.ts ~ line 13 ~ MailsController ~ sendContactEmail ~ contactDto',
      contactDto,
    );
    await this.mailService.sendContactMail(contactDto);
  }
  @ApiOperation({ summary: 'Send emails by Role' })
  @Post('role')
  async sendEmailsByRole(@Body() body: RoleEmailsDto) {
    return await this.mailService.sendEmailByRole(body);
  }

  @ApiOperation({ summary: 'Send Custom Emails' })
  @Post('custom')
  async sendCustomEmail(@Body() body: CustomEmailDto) {
    return await this.mailService.sendCustomEmail(body);
  }
}

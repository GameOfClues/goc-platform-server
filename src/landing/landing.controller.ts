import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { LandingService } from "./landing.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { CreateFaqDto } from "./dto/create-faq.dto";

@Controller('landing')
export class LandingController {
  constructor(private landingService: LandingService) {}

  @HttpCode(HttpStatus.OK)
  @Post('messages')
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.landingService.createMessage(createMessageDto.name, createMessageDto.email, createMessageDto.subject, createMessageDto.content);
  }

  @HttpCode(HttpStatus.OK)
  @Get('messages')
  getMessages() {
    return this.landingService.getMessages();
  }

  @HttpCode(HttpStatus.OK)
  @Post('faq')
  creatFaq(@Body() createFaqDto: CreateFaqDto) {
    return this.landingService.createFaq(createFaqDto.question, createFaqDto.answer);
  }

  @HttpCode(HttpStatus.OK)
  @Get('faq')
  getFaq() {
    return this.landingService.getFaq();
  }

  @HttpCode(HttpStatus.OK)
  @Get('faq/:id')
  getFaqById(@Param('id') id: string) {
    return this.landingService.getFaqById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('faq/:id')
  updateFaq(@Param('id') id: string, @Body() updateFaqDto: CreateFaqDto) {
    return this.landingService.updateFaq(id, updateFaqDto.question, updateFaqDto.answer);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('faq/:id')
  remove(@Param('id') id: string) {
    return this.landingService.deleteFaq(id);
  }
}

import { Module } from '@nestjs/common';
import { LandingController } from './landing.controller';
import { LandingService } from './landing.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./schemas/message.schema";
import { Faq, FaqSchema } from "./schemas/faq.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Message.name, schema: MessageSchema },
    { name: Faq.name, schema: FaqSchema },
  ])],
  controllers: [LandingController],
  providers: [LandingService]
})
export class LandingModule {}

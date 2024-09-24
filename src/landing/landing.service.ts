import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { Faq } from './schemas/faq.schema';
import { User } from "../users/schemas/user.schema";

@Injectable()
export class LandingService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Faq.name) private faqModel: Model<Faq>) {}

  async createMessage(name: string, email: string, subject: string, content: string): Promise<boolean> {
    let message = new this.messageModel({
      name: name,
      email: email,
      subject: subject,
      content: content,
      createdOn: new Date(),
      isRead: false
    });

    message.save();

    return true;
  }

  async getMessages(): Promise<Array<Message>> {
    return this.messageModel.find().exec();
  }

  async createFaq(question: string, answer: string): Promise<boolean> {
    let faq = new this.faqModel({
      question: question,
      answer: answer
    });

    faq.save();

    return true;
  }

  async updateFaq(id: string, question: string, answer: string): Promise<boolean> {
    await this.faqModel.findByIdAndUpdate(id, {
      question: question,
      answer: answer
    }).exec();

    return true;
  }

  async deleteFaq(id: string): Promise<boolean> {
    await this.faqModel
      .findByIdAndDelete(id)
      .exec();

    return true;
  }

  async getFaq(): Promise<Array<Faq>> {
    return this.faqModel.find().exec();
  }

  async getFaqById(_id: string): Promise<Faq> {
    return await this.faqModel.findOne({ _id }, { __v: 0}).exec();
  }
}

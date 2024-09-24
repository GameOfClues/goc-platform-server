import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDetailsDto } from "./dto/user-details.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }, { passwordHash: 0, __v: 0, roles: 0 }).exec();
  }

  async findAll(): Promise<Array<User>> {
    return this.userModel.find({}, { passwordHash: 0 }).exec();
  }
}
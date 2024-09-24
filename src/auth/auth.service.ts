import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { Model } from "mongoose";
import { Role } from "./enums/role.enum";
import * as bcrypt from "bcrypt";
import * as crypto from 'crypto';
import * as sendGrid from '@sendgrid/mail';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>) {}

  async register(firstName: string, lastName: string, email: string, phoneNumber: string): Promise<boolean> {
    let password = crypto.randomBytes(8).toString('base64').slice(0, 8);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let createdUser = new this.userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: passwordHash,
      phoneNumber: phoneNumber,
      roles: ['user']
    });

    createdUser.save();

    sendGrid.setApiKey('');

    const msg = {
      to: email,
      from: {
        email: 'gameofclues.pz@gmail.com',
        name: 'Игра на Улики'
      },
      subject: 'Създаден профил в платформата "Игра на Улики"',
      html: `
            <p>Здравейте <strong>${firstName} ${lastName}</strong>, </p>
            <p>Искаме да ви съобщим, че с вашия имейл е създаден профил в платформата на "Игра на Улики".</p>
            <p>Вашата парола е <strong>${password}</strong>.</p>
            <p>Съветваме ви да я смените с цел по-висока защита на профила ви.</p>`
    }

    sendGrid
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

    return true;
  }

  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Passwords did not match!');
    }

    const payload = { email: user.email, sub: user._id, roles: user.roles };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
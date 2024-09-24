import { Role } from "../../auth/enums/role.enum";
import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: [String], enum: Role })
  roles: Array<Role>;
}

export const UserSchema = SchemaFactory.createForClass(User);
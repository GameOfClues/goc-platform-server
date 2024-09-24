import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FaqDocument = HydratedDocument<Faq>;

@Schema()
export class Faq {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: String;

  @Prop({ type: Date, default: Date.now })
  publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

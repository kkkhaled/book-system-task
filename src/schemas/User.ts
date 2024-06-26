import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Book' }] }) // Use 'ObjectId' instead of mongoose.Types.ObjectId
  books: string[];
}

export const UserSchema = SchemaFactory.createForClass(User); // Export the schema

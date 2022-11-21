import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  date: Date;

  @Prop({ default: 0 })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

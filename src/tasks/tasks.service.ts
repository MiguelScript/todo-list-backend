import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasksDto';
import { Task, TaskDocument } from './schemas/task.schemas';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().sort({ _id: 'desc' }).exec();
  }

  async find(TaskId: string): Promise<Task> {
    return this.taskModel.findById(TaskId).exec();
  }

  async update(TaskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    //actualiza la tarea y devuelve el registro modificado
    const taskUpdated = await this.taskModel.findByIdAndUpdate(
      TaskId,
      updateTaskDto,
      {
        new: true,
      },
    );

    if (taskUpdated === null) {
      throw new BadRequestException('No se encontro el registro', {
        cause: new Error('No se encontro el registro'),
      });
    }

    return taskUpdated;
  }

  async delete(TaskId: string): Promise<Task> {
    const taskDeleted = await this.taskModel.findByIdAndDelete(TaskId);

    if (taskDeleted === null) {
      throw new BadRequestException('No se encontro el registro', {
        cause: new Error(),
      });
    }
    return taskDeleted;
  }
}

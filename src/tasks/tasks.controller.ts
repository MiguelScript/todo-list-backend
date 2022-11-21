import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Patch,
  Delete,
  Res,
  Param,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasksDto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll(@Res() res) {
    try {
      //buscar todas las tareas

      const tasks = await this.tasksService.findAll();

      return res.status(HttpStatus.OK).json({
        message: 'Se han encontrado tareas',
        tasks: tasks,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.response,
      });
    }
  }

  @Post()
  async create(@Res() res, @Body() createTaskDto: CreateTaskDto) {
    try {
      //crear una tarea

      const createdTask = await this.tasksService.create(createTaskDto);

      return res.status(HttpStatus.OK).json({
        message: 'creado',
        task: createdTask,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.response,
      });
    }
  }

  @Get(':id')
  async get(@Param('id') taskId: string, @Res() res) {
    try {
      //buscar una tarea
      const tasks = await this.tasksService.find(taskId);

      return res.status(HttpStatus.OK).json({
        message: 'Se han encontrado la tarea',
        tasks: tasks,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.response,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') taskId: string,
    @Res() res,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      //actualizar una tarea
      const updatedTask = await this.tasksService.update(taskId, updateTaskDto);

      return res.status(HttpStatus.OK).json({
        message: 'actualizado',
        task: updatedTask,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.response,
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') taskId: string, @Res() res) {
    try {
      //borrar una tarea
      await this.tasksService.delete(taskId);

      return res.status(HttpStatus.OK).json({
        message: 'eliminado',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.response,
      });
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(completed?: boolean): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: completed !== undefined ? { completed } : {},
    });
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.findOne(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number): Promise<Task> {
    const existingTask = await this.findOne(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return this.prisma.task.delete({
      where: { id },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetClassFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {

    }


    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async getTaskById(id: number, user: User) : Promise<Task> {
        const found = await this.taskRepository.findOne({id: id, userId: user.id});
        if(!found) {
            throw new NotFoundException(`Task with ${id} is not found`);
        }
        return found;
    }

    async removeTaskById(id: number): Promise<void> {
        const task = await this.taskRepository.findOne(id);
        if(!task) {
            throw new NotFoundException(`Task with ${id} is not found`);
        }
        let r = await task.remove();
        console.log('Task removed', r);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const found = await this.taskRepository.delete({id: id, userId: user.id});
        if(found.affected === 0) {
            throw new NotFoundException(`Task with ${id} is not found`);
        }
    }

    async updateTaskStatusById(id: number, status: TaskStatus, user: User) : Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
    
    async getTasks(filterDto: GetClassFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

}

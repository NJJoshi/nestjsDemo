import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetClassFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private taskService: TasksService) {}
    // private tasks: Task[] = [];

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetClassFilterDto, @GetUser()user: User) : Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all Tasks. Applied filters: ${JSON.stringify(filterDto)}`);
        return this.taskService.getTasks(filterDto, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task>{
        return this.taskService.createTask(createTaskDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser()user: User): Promise<Task> {
        const found = this.taskService.getTaskById(id, user);        
        return found;
    }

    @Delete('/:id')
    removeTaskById(@Param('id', ParseIntPipe) id: number, @GetUser()user: User): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id:number, 
                     @Body('status', TaskStatusValidationPipe) status: TaskStatus, 
                     @GetUser()user: User) : Promise<Task> {
        console.log('Id:' , id);
        console.log('Status:' , status);
        return this.taskService.updateTaskStatusById(id, status, user);
    }
}

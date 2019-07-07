import { CreateTaskDto } from './dto/create.task.dto';
import { Task, TaskStatus } from './task.model';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilter(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTasks(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto); 
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status/:status')
    updateTaskStatus(
        @Param('id') id: string,
        @Param('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}

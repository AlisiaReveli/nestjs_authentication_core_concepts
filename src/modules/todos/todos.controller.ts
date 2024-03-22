import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '../../core/database/entities/todos.entity';
import { TodosDto } from './dto/todos.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}
  @Get()
  async findAll() {
    // get all posts in the db
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Todo> {
    // find the post with this id
    const post = await this.todoService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return post;
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() todo: TodosDto, @Request() req): Promise<Todo> {
    // create a new post and return the newly created post
    return await this.todoService.create(todo, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() todo: TodosDto,
    @Request() req,
  ): Promise<Todo> {
    // get the number of row affected and the updated post
    const todoItem = await this.todoService.findOne(id);

    if (!todoItem) {
      throw new NotFoundException("This Todo doesn't exist");
    }
    const { updatedPost } = await this.todoService.update(
      id,
      todo,
      req.user.id,
    );

    // return the updated post
    return updatedPost;
  }
}

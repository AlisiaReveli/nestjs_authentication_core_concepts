import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../../core/database/entities/todos.entity';
import { TodosDto } from './dto/todos.dto';
import { User } from '../../core/database/entities/user.entity';
import { TODO_REPOSITORY } from '../../../constants';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly postRepository: typeof Todo,
  ) {}
  async create(post: TodosDto, userId): Promise<Todo> {
    return await this.postRepository.create<Todo>({ ...post, userId });
  }

  async findAll(): Promise<Todo[]> {
    return await this.postRepository.findAll<Todo>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }
  async findOne(id): Promise<Todo> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}

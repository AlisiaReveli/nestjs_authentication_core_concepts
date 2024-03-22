import { IsBoolean, IsNotEmpty, MinLength } from 'class-validator';

export class TodosDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;

  @IsBoolean()
  readonly completed?: boolean;
}

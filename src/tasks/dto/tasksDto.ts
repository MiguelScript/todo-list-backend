import {
  IsString,
  IsBoolean,
  MaxLength,
  MinLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  @MinLength(2, {
    message: 'El nombre deber ser mayor 2 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre deber ser menos a 50 caracteres',
  })
  name: string;
  @IsString()
  description: string;
  @IsOptional()
  @IsDateString({
    message: 'La debe fecha debe ser una fecha valida',
  })
  date: Date;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsBoolean()
  completed: boolean;
}

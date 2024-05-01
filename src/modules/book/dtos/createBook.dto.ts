import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @Expose()
  @IsString()
  title: string;

  @IsOptional()
  @Expose()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  author: string;

  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;
}

import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
// import { Request } from 'express';
import { JwtAuthGuard } from 'src/shared/jwt-auth-guard';
import { User } from '../user/types/user';
import { CreateBookDto } from './dtos/createBook.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createBook(
    @Req() req: any,
    @Body('title') title,
    @Body('description') description,
    @Body('publishDate') publishDate,
  ) {
    const user = req.user as User;
    const createBookDto: CreateBookDto = {
      title,
      description,
      publishedDate: publishDate,
      author: user._id,
    };
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  async findAllBooks(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.bookService.findAllBooks(page, limit);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/Book';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly book: Model<Book>) {}

  async createBook(CreateBookDto) {
    try {
      const newBook = new this.book(CreateBookDto);
      return newBook.save();
    } catch (error) {
      return {
        error: error?.message,
      };
    }
  }

  async findAllBooks(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const totalItems = await this.book.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
      const books = await this.book
        .find()
        .skip(skip)
        .limit(limit)
        .populate({ path: 'author', select: 'name' })
        .exec();

      return {
        page,
        size: limit,
        totalItems,
        totalPages,
        data: books,
      };
    } catch (error) {
      return {
        error: error?.message,
      };
    }
  }
}

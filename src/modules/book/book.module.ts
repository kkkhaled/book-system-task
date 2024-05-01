import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/schemas/Book';
import { User, UserSchema } from 'src/schemas/User';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule {}

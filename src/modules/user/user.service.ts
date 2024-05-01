import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../../schemas/User';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private user: Model<User>,
    private jwtService: JwtService,
  ) {}

  // register user
  async signup(userData: UserDto) {
    const { email, password, name } = userData;

    // Check if user already exists with the provided email
    const existingUser = await this.user.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    // hashed password before saved
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.user.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  // login users
  async login(userData: UserDto): Promise<{ token: string }> {
    const { email, password } = userData;

    const user = await this.user.findOne({ email });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}

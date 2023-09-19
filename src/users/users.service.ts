import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma.service';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async transformToClass(data: User): Promise<User> {
    return new User(data);
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.transformToClass(
      await this.prisma.user.create({ data: createUserInput }),
    );
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    return this.transformToClass(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
    return this.transformToClass(user);
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    return this.transformToClass(user);
  }
}

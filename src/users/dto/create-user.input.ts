import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { Role } from '@prisma/client';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  password: string;

  @Field(() => Role)
  role: Role;
}

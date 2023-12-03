import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class User {
  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  @Field(() => ID)
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  @Exclude()
  password?: string;
  @Field(() => Role)
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

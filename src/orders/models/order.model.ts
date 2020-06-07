  
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
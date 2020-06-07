import { Injectable } from '@nestjs/common';
import { NewOrderInput } from './dto/new-order.input';
import { OrdersArgs } from './dto/orders.args';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewOrderInput): Promise<Order> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Order> {
    return {} as any;
  }

  async findAll(orderArgs: OrdersArgs): Promise<Order[]> {
    return [] as Order[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
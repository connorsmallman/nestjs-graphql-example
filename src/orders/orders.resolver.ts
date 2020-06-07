import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewOrderInput } from './dto/new-order.input';
import { OrdersArgs } from './dto/orders.args';
import { Order } from './models/order.model';
import { OrdersService } from './orders.service';

const pubSub = new PubSub();

@Resolver(of => Order)
export class OrdersResolver {
  constructor(private readonly OrdersService: OrdersService) {}

  @Query(returns => Order)
  async Order(@Args('id') id: string): Promise<Order> {
    const Order = await this.OrdersService.findOneById(id);
    if (!Order) {
      throw new NotFoundException(id);
    }
    return Order;
  }

  @Query(returns => [Order])
  Orders(@Args() ordersArgs: OrdersArgs): Promise<Order[]> {
    return this.OrdersService.findAll(ordersArgs);
  }

  @Mutation(returns => Order)
  async addOrder(
    @Args('newOrderData') newOrderData: NewOrderInput,
  ): Promise<Order> {
    const Order = await this.OrdersService.create(newOrderData);
    pubSub.publish('OrderAdded', { orderAdded: Order });
    return Order;
  }

  @Mutation(returns => Boolean)
  async removeOrder(@Args('id') id: string) {
    return this.OrdersService.remove(id);
  }

  @Subscription(returns => Order)
  OrderAdded() {
    return pubSub.asyncIterator('OrderAdded');
  }
}
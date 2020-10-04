import { Category } from './index';

export class Toy {
  constructor({
    id = '',
    name = '',
    quantity = 0,
    price = 0,
    totalCost = 0,
    description = '',
    category = new Category({}),
  }) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.totalCost = totalCost;
    this.description = description;
    this.category = category;
  }
}

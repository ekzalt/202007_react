export class Car {
  constructor({ id = '', model = '', color = '' }) {
    this.id = id;
    this.model = model;
    this.color = color;
  }
}

export class Product {
  constructor({ id = '', name = '', description = '', price = 0 }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

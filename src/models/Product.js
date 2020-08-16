import { v4 as uuidv4 } from 'uuid';

export const Category = Object.freeze({
  Alcohol: 'Alcohol',
  Drinks: 'Drinks',
  Fruits: 'Fruits',
  Vegetables: 'Vegetables',
  MeatAndMilk: 'Meat & Milk',
});

export class Product {
  constructor({
    id = '',
    name = '',
    category = '',
    description = '',
    price = 0,
    selected = false,
    edited = false,
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.selected = selected;
    this.edited = edited;
  }
}

export const mockProducts = [
  new Product({
    id: uuidv4(),
    name: 'CocaCola',
    category: Category.Drinks,
    description: '2 liters',
    price: 50,
  }),
  new Product({
    id: uuidv4(),
    name: 'Tomatoes',
    category: Category.Vegetables,
    description: 'Cherry',
    price: 40,
  }),
  new Product({
    id: uuidv4(),
    name: 'Beef',
    category: Category.MeatAndMilk,
    description: '1 kilogram for barbecue',
    price: 140,
  }),
];

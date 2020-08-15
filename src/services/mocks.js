import { Product, Category } from '../models';

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

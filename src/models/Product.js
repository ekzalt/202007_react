export const Category = Object.freeze({
  Alcohol: 'Alcohol',
  Drinks: 'Drinks',
  Fruits: 'Fruits',
  Vegetables: 'Vegetables',
  MeatAndMilk: 'Meat & Milk',
});

export default class Product {
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

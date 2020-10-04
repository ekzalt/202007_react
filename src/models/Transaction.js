import { Toy } from './index';

export const TransactionType = Object.freeze({
  incoming: 'incoming',
  outcoming: 'outcoming',
});

export class Transaction {
  constructor({
    id = '',
    date = '', // json date
    userId = '',
    toys = [],
    type = '',
  }) {
    this.id = id;
    this.date = date ? new Date(date) : new Date();
    this.userId = userId;
    /** @type {Toy[]} */
    this.toys = toys;
    /** @type {string} `incoming | outcoming` */
    this.type = type;
  }
}

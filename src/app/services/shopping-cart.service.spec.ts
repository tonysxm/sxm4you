import { TestBed, inject } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import {ShoppingCartItem} from '../models/shopping-cart-item';
import {Product} from '../models/product';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  const emptyShoppingCartItems = new Array<ShoppingCartItem>();
  const demoProduct1 = { id: 1,
    name: 'Beans',
    activePrice: 4.50,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
    '      Donec mattis pretium massa. Aliquam erat volutpat.',
    categories: [
      'Fruit & Vegetables',
      'Whole Grain'
    ]
  };
  const demoProduct2 = { id: 1,
    name: 'Pizza',
    activePrice: 10.50,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
    '      Donec mattis pretium massa. Aliquam erat volutpat.',
    categories: [
      'Whole Grain'
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartService]
    });
    service = new ShoppingCartService();
  });

  it('should be created', inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).toBeTruthy();
  }));

  it('shopping Cart Should Be Empty', () => {
    expect(service.getShoppingCartItems())
      .toEqual(emptyShoppingCartItems);
  });

  it('shoppingCart add CartItem', () => {
    const expectedShoppingItem =  new ShoppingCartItem();
    const amount1 = 1;
    expectedShoppingItem.product = demoProduct1;
    expectedShoppingItem.amount = amount1;
    service.addCartItem(demoProduct1, amount1);
    expect(service.getShoppingCartItems().length).toEqual(1);

    const shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem).toEqual(expectedShoppingItem);

    const amount2 = 3;
    const expectedShoppingItem2 =  new ShoppingCartItem();
    expectedShoppingItem2.product = demoProduct2;

    expectedShoppingItem2.amount = amount2;
    service.addCartItem(demoProduct2, amount2);
    expect(service.getShoppingCartItems().length).toEqual(2);

    const shoppingCartItem2 = service.getShoppingCartItems()[1];
    expect(shoppingCartItem2).toEqual(expectedShoppingItem2);
  });

  it('update existing Shopping item', () => {
    const expectedShoppingItem =  new ShoppingCartItem();
    const amount1 = 1;
    expectedShoppingItem.product = demoProduct1;
    expectedShoppingItem.amount = amount1;
    service.addCartItem(demoProduct1, amount1);
    expect(service.getShoppingCartItems().length).toEqual(1);

    const shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem).toEqual(expectedShoppingItem);

    service.updateShoppingCartItemAmount(demoProduct1, 3);
    const updatedShoppingCartItem = service.getShoppingCartItems()[0];
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.amount).toEqual(3);
  });

  it('update existing Shopping item', () => {
    const expectedShoppingItem =  new ShoppingCartItem();
    const amount1 = 1;
    expectedShoppingItem.product = demoProduct1;
    expectedShoppingItem.amount = amount1;
    service.addCartItem(demoProduct1, amount1);
    expect(service.getShoppingCartItems().length).toEqual(1);

    const shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem).toEqual(expectedShoppingItem);

    service.updateShoppingCartItemAmount(demoProduct1, 3);
    const updatedShoppingCartItem = service.getShoppingCartItems()[0];
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.amount).toEqual(3);
  });

  it('update existing Shopping item by one', () => {
    const expectedShoppingItem =  new ShoppingCartItem();
    const amount1 = 1;
    expectedShoppingItem.product = demoProduct1;
    expectedShoppingItem.amount = amount1;
    service.addCartItem(demoProduct1, amount1);
    expect(service.getShoppingCartItems().length).toEqual(1);

    const shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem.product).toEqual(demoProduct1);
    expect(shoppingCartItem.amount).toEqual(amount1);

    service.addCartItem(demoProduct1, amount1);
    let updatedShoppingCartItem = service.getShoppingCartItems()[0];
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.amount).toEqual(2);

    service.addCartItem(demoProduct1, amount1);
    updatedShoppingCartItem = service.getShoppingCartItems()[0];
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.amount).toEqual(3);
  });

  it('reduce existing Shopping item by one', () => {
    const expectedShoppingItem =  new ShoppingCartItem();
    const amount1 = 1;
    expectedShoppingItem.product = demoProduct1;
    expectedShoppingItem.amount = amount1;
    service.addCartItem(demoProduct1, amount1);
    expect(service.getShoppingCartItems().length).toEqual(1);

    const shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem.product).toEqual(demoProduct1);
    expect(shoppingCartItem.amount).toEqual(amount1);

    service.addCartItem(demoProduct1, amount1);
    let updatedShoppingCartItem = service.getShoppingCartItems()[0];
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.amount).toEqual(2);

    service.reduceCartItemAmountByOne(demoProduct1);
    updatedShoppingCartItem = service.getShoppingCartItems()[0];
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.product).toEqual(demoProduct1);
    expect(updatedShoppingCartItem.amount).toEqual(1);
  });

  it('Delete existing Shopping item', () => {
    const expectedShoppingItem1 =  new ShoppingCartItem();
    const amount1 = 1;
    expectedShoppingItem1.product = demoProduct1;
    expectedShoppingItem1.amount = amount1;

    const expectedShoppingItem2 =  new ShoppingCartItem();
    const amount2 = 4;
    expectedShoppingItem2.product = demoProduct2;
    expectedShoppingItem2.amount = amount2;

    service.addCartItem(demoProduct1, amount1);
    service.addCartItem(demoProduct2, amount2);
    expect(service.getShoppingCartItems().length).toEqual(2);

    let shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem.product).toEqual(demoProduct1);
    expect(shoppingCartItem.amount).toEqual(amount1);

    service.removeCartItem(demoProduct1);
    expect(service.getShoppingCartItems().length).toEqual(1);

    shoppingCartItem = service.getShoppingCartItems()[0];
    expect(shoppingCartItem.product).toEqual(demoProduct2);
    expect(shoppingCartItem.amount).toEqual(amount2);
  });

  afterEach(() => {
    service = null;
  });
});

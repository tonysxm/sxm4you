export const navigation = [
  {
    'id'      : 'webshop',
    'title'   : 'Webshop',
    'translate': 'NAV.WEBSHOP',
    'type'    : 'group',
    'children': [
      {
        'id'   : 'stores',
        'title': 'Stores',
        'translate': 'NAV.STORES.TITLE',
        'type' : 'item',
        'icon' : 'store',
        'url'  : '/store-list'
      },
      {
        'id'   : 'products',
        'title': 'Products',
        'translate': 'NAV.PRODUCTS.TITLE',
        'type' : 'item',
        'icon' : 'shopping',
        'url'  : '/product-list'
      }
    ]
  },
  {
    'id'      : 'Personal',
    'title'   : 'personal',
    'translate': 'NAV.Personal',
    'type'    : 'group',
    'children': [
      {
        'id'   : 'shopping-cart',
        'title': 'Shopping Cart',
        'translate': 'NAV.SHOPPING-CART.TITLE',
        'type' : 'item',
        'icon' : 'shopping_cart',
        'url'  : '/shopping-cart'
      }
    ]
  }
];

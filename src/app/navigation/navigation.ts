export const navigation = [
  {
    'id'      : 'backend',
    'title'   : 'BACKEND',
    'translate': 'NAV.BACKEND',
    'type'    : 'group',
    'children': [
      {
    'id'       : 'e-commerce',
    'title'    : 'E-Commerce',
    'translate': 'NAV.ECOMMERCE',
    'type'     : 'collapse',
    'icon'     : 'shopping_cart',
    'children' : [
      {
        'id'   : 'dashboard',
        'title': 'Dashboard',
        'type' : 'item',
        'url'  : '/e-commerce/dashboard'
      },
      {
        'id'        : 'products',
        'title'     : 'Products',
        'type'      : 'item',
        'url'       : '/e-commerce/products',
        // 'exactMatch': true
      },
      {
        'id'        : 'orders',
        'title'     : 'Orders',
        'type'      : 'item',
        'url'       : '/e-commerce/orders',
        // 'exactMatch': true
      }
    ]
  }
    ]
  },
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
        'id'   : 'shopping-cart',
        'title': 'Shopping Cart',
        'translate': 'NAV.SHOPPING-CART.TITLE',
        'type' : 'item',
        'icon' : 'shopping_cart',
        'url'  : '/shopping-cart'
      }
      // {
      //   'id'   : 'products',
      //   'title': 'Products',
      //   'translate': 'NAV.PRODUCTS.TITLE',
      //   'type' : 'item',
      //   'icon' : 'shopping',
      //   'url'  : '/product-list'
      // }
    ]
  }
];

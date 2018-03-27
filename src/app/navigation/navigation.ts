export const navigation = [
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
        'id'        : 'productDetail',
        'title'     : 'Product Detail',
        'type'      : 'item',
        'url'       : '/e-commerce/products/1/printed-dress',
        // 'exactMatch': true
      },
      {
        'id'        : 'orders',
        'title'     : 'Orders',
        'type'      : 'item',
        'url'       : '/e-commerce/orders',
        // 'exactMatch': true
      },
      {
        'id'        : 'orderDetail',
        'title'     : 'Order Detail',
        'type'      : 'item',
        'url'       : '/e-commerce/orders/1',
        // 'exactMatch': true
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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if (!products) { return []; }
    if (!searchText) { return products; }

    searchText = searchText.toLowerCase();

    return products.filter( product => {
      return product.name.toLowerCase().includes(searchText)
        || product.description.toLowerCase().includes(searchText)
        || product.categories.map(category => category.toLowerCase()).some(category => category.toLowerCase().includes(searchText));
    });
  }

}

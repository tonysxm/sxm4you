import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCategoryFilter'
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(products: any[], selectedCategories: string[]): any[] {
    if (!products) { return []; }
    if (selectedCategories === undefined) { return products; }
    if (selectedCategories.length === 0) { return products; }

    return products.filter( product => {
      return JSON.parse(product.categories).some(r => selectedCategories.indexOf(r) >= 0);
    });
  }

}

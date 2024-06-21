import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Product } from './interfaces/product.interface';
import { category } from './interfaces/category.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CardComponent],
})
export class AppComponent {
  title = 'card-carousel';

  product: any[] = [];
  filteredProducts: any;
  productsByCategory: { [category: string]: Product[] } = {};
  categoryArray: any[] = [];
  categorySet = new Set<string>();
  groupedProducts: category[] | any = [];
  categories: category[] | any = [];

  async fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    console.log(data.products);
    this.product = data.products;

    this.product.forEach((product) => {
      this.categorySet.add(product.category);
    });

    this.categoryArray = Array.from(this.categorySet);

    this.groupedProducts = this.product.reduce((acc, product) => {
      const { category } = product;

      // Check if category exists in the accumulator object, if not create an empty array
      if (!acc[category]) {
        acc[category] = [];
      }

      // Push the product into the corresponding category array
      acc[category].push(product);

      return acc;
    }, {});

    this.categories = Object.keys(this.groupedProducts).map((category) => ({
      name: category,
      products: this.groupedProducts[category],
    }));

    console.log(this.categories);

    // const category = 'fragrances';
    for (let i = 0; i < this.categoryArray.length; i++) {
      this.filteredProducts = data.products.filter(
        (product: any) => product.category === this.categoryArray[i]
      );

      // console.log(this.categoryArray[i]);

      console.log(this.filteredProducts);
    }

    // for (let i = 0; i < 10; i++) {
    //   console.log((data.products[i].category = 'beauty'));
    // }
    // this.product = data.products;
  }

  getCategories(): string[] {
    return Object.keys(this.groupedProducts);
  }

  getVal(): any[] {
    console.log('hai');

    console.log(Object.values(this.groupedProducts));

    return Object.values(this.groupedProducts);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
}

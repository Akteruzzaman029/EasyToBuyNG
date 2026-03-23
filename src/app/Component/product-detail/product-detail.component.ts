import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


interface ProductImage {
  id: number;
  url: string;
}

interface ProductDetailsModel {
  name: string;
  size: string;
  rating: number;
  reviewCount: number;
  price: number;
  oldPrice?: number;
  stock: number;
  sku: string;
  brand: string;
  benefits: string;
  itemForm: string;
  materialType: string;
  scent: string;
  categories: string[];
  tags: string[];
  shortDescription: string[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent  {
  quantity = 1;

  productImages: ProductImage[] = [
    { id: 1, url: 'https://via.placeholder.com/700x700?text=Product+1' },
    { id: 2, url: 'https://via.placeholder.com/700x700?text=Product+2' },
    { id: 3, url: 'https://via.placeholder.com/700x700?text=Product+3' },
    { id: 4, url: 'https://via.placeholder.com/700x700?text=Product+4' },
    { id: 5, url: 'https://via.placeholder.com/700x700?text=Product+5' },
  ];

  selectedImage = this.productImages[0].url;

  product: ProductDetailsModel = {
    name: 'Parachute Naturale Shampoo Nourishing Care 160ml (Pack of 2)',
    size: '160ml',
    rating: 4.1,
    reviewCount: 0,
    price: 280,
    oldPrice: 320,
    stock: 5,
    sku: '39742',
    brand: 'Parachute Naturale',
    benefits: 'Strong & Silky Hair',
    itemForm: 'Liquid Shampoo',
    materialType: 'Paraben, Silicone Free',
    scent: 'Coconut',
    categories: [
      'Hair',
      'Men',
      'Buy 1 Get 1',
      'Hair Care',
      'Shampoo',
      'Free Delivery',
    ],
    tags: [
      'FMCG',
      'marico-bangladesh',
      'Pink Beauty Sale',
      'campaign',
      'pink beauty sale 5.0',
    ],
    shortDescription: [
      'Brand: Parachute Naturale.',
      'Product Benefits: Strong & Silky Hair.',
      'Item Form: Liquid Shampoo.',
      'Material Type Free: Paraben, Silicone Free.',
      'Scent: Coconut.',
    ],
  };

  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    console.log('Add to cart', {
      product: this.product,
      quantity: this.quantity,
    });
  }

  addToWishlist(): void {
    console.log('Wishlist clicked');
  }
}

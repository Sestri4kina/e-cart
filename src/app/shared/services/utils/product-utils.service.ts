import { Injectable } from '@angular/core';
import { ProductWithImage, Product, ImageData } from '@app/shared/models/product';

@Injectable()
export class ProductUtilsService {

    composeProductArray(products: Array<Product>, images: Array<ImageData>): Array<ProductWithImage> {
        let productsWithImages: Array<ProductWithImage> = [];

        products.forEach(product => {
            let productWithImage: ProductWithImage;
            const imageId = product.relationships.main_image.data.id;

            const image = images.find(image => {
                return image.id === imageId
            })

            productWithImage = { ...product, imageData: image };

            productsWithImages.push(productWithImage);
        });

        return productsWithImages;
    }
}
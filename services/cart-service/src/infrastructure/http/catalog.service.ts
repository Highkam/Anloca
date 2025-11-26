import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  is_active: boolean;
  created_at: string;
}

@Injectable()
export class CatalogService {
  private readonly catalogUrl: string;

  constructor() {
    this.catalogUrl = process.env.CATALOG_SERVICE_URL || 'http://catalog:3000/api';
  }

  async getProductById(productId: number): Promise<Product> {
    try {
      const response = await fetch(`${this.catalogUrl}/products/${productId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException(`Producto con id ${productId} no encontrado`, HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Error al consultar el servicio de catálogo', HttpStatus.SERVICE_UNAVAILABLE);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error de comunicación con el servicio de catálogo', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}

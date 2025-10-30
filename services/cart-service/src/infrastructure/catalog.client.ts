import { Injectable, Logger } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class CatalogClientService {
  private readonly client: any;
  private readonly logger = new Logger(CatalogClientService.name);

  constructor() {
    const baseURL = process.env.CATALOG_URL || 'http://catalog:3000';
    this.client = axios.create({ baseURL, timeout: 3000 });
  }

  async getProduct(productId: number): Promise<any | null> {
    try {
      const res = await this.client.get(`/api/products/${productId}`);
      return res.data;
    } catch (e) {
      this.logger.warn(`Failed to fetch product ${productId} from catalog`);
      return null;
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class CatalogClientService {
  private readonly client: any;
  private readonly logger = new Logger(CatalogClientService.name);

  constructor() {
    const baseURL = 'http://catalog:3000';
    this.client = axios.create({ baseURL, timeout: 3000 });
  }

  async getProduct(productId: number): Promise<any | null> {
    try {
      this.logger.debug(`Fetching product ${productId} from catalog service`);
      const res = await this.client.get(`/api/products/${productId}`);
      this.logger.debug(`Product ${productId} found: ${JSON.stringify(res.data)}`);
      return res.data;
    } catch (e: any) {
      this.logger.warn(`Failed to fetch product ${productId} from catalog: ${e.message}`);
      if (e.response) {
        this.logger.warn(`Response status: ${e.response.status}`);
      }
      return null;
    }
  }
}
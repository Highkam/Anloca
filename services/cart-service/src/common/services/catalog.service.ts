import * as http from 'http';

export class CatalogService {
  private readonly hostname = 'localhost';
  private readonly port = 3000; // catalog-service default

  async productExists(productId: number): Promise<boolean> {
    const path = `/products/${encodeURIComponent(String(productId))}`;
    const options: http.RequestOptions = {
      hostname: this.hostname,
      port: this.port,
      path,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    };

    return new Promise((resolve) => {
      const req = http.request(options, res => {
        // If catalog returns 200, product exists. 404 means not found.
        if (res.statusCode === 200) {
          resolve(true);
          res.resume();
          return;
        }
        resolve(false);
        res.resume();
      });

      req.on('error', () => resolve(false));
      req.end();
    });
  }
}

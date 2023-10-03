import { Injectable } from '@nestjs/common';
import {ProductService} from "../product/product.service";
import {ElasticsearchService} from "@nestjs/elasticsearch";

@Injectable()
export class ElasticsearchIndexingService {

    constructor(
        private productService: ProductService,
        private elasticsearchService: ElasticsearchService
    ) {
    }

    async fetchAllProduct() {
        const data = await this.productService.findAll();
        console.log('Fetched Data: ', data);
        const bulkBody = [];
        for (const item of data) {
            bulkBody.push({
                index: {
                    _index: 'product', // Replace with your Elasticsearch index name
                    _type: '_doc',
                    _id: item.id, // Assuming each item has an ID
                },
            });
            bulkBody.push(item.dataValues); // Include your data here
        }

        const bulkResponse = data.length>0 ? await this.elasticsearchService.bulk({ body: bulkBody }): 'No Product giving in Data Warehouse !';

        console.log('bulkResponse: ', bulkResponse);
    }
}

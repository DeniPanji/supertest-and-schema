import request from 'supertest';
import * as chai from 'chai';
//import product from './product.json' assert { type: "json" };
import chaiJsonSchemaAjv from 'chai-json-schema-ajv';
import { product, deleteSchema } from '../product_schema.js';

chai.use(chaiJsonSchemaAjv);
const { expect } = chai;


describe('Product API Test', () => {
    const url = 'https://dummyjson.com';
    var id;

    it('should successfully create a product', () => {
        request(url)
            .post('/products/add')
            .send(product)
            .end(function(err, res){
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.id).not.to.be.null;
                // expect(res.body.product.title).to.be.equal(product.title);
                // expect(res.body.product.description).to.be.equal(product.description);
                // expect(res.body.product.price).to.be.equal(product.price);
                // expect(res.body.product.discountPercentage).to.be.equal(product.discountPercentage);
                if (err) {
                    throw err;
                }
            });

    });

    it('should successfully get a product', () => {
        request(url)
            .get('/products/' + id)
            .end(function(err) {
                expect(200)
                if (err) throw err;
            });
    });

    it('should successfully get all products', () => {
        request(url)
            .get('/products/')
            .end(function(err, res) {
                if (err) throw err;
                expect(res.body).to.be.jsonSchema(product);  
            });
    });

    it('should successfully get all product categories', () => {
        request(url)
            .get('/products/categories')
            .end(function(err){
                if (err) throw err;
            })
    });

    it('should successfully delete a product', () => {
        request(url)
            .delete('/products/'+ id)
            .end(function(err){
                if (err) throw err;
            })
            

    });
});


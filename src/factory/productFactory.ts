import axios, { AxiosPromise } from "axios";

class Product {
  static getAll(): AxiosPromise<any> {
    return axios("https://fakestoreapi.com/products");
  }
  static getOne(id: string): AxiosPromise<any> {
    return axios(`https://fakestoreapi.com/products/${id}`);
  }
}

export default Product;

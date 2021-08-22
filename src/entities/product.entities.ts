import { entity, persistence } from "simpler-state";

class Product {
  name: string;
  id: string;
  images: string[];
  price: number;

  constructor(name: string, id: string, images: string[], price: number) {
    this.name = name;
    this.id = id;
    this.images = images;
    this.price = price;
  }
}

interface IDefaultState {
  products: Array<Product>;
  cart: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

const product1 = new Product("Nike Shoe", "sjjsh2", ["url"], 200);

const defaultState: IDefaultState = {
  products: [product1],
  cart: []
};

export const productEntity = entity(defaultState, [persistence('Shop_Products')])

// action

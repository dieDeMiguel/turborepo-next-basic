import { BlockContent } from "@/sanity.types";

export type Order = {
    orderNumber: string;
    orderDate: string;
    status: string;
    totalPrice: number;
    currency: string;
    amountDiscount: number;
    products: {
      product: {
        _id: string;
        name: string;
        price: number;
        image: string;
      };
      quantity: number;
    }[];
  };
  
  export type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  
  export type PageContent = {
    title?: string;
    slug: string;
    content: BlockContent;
  };
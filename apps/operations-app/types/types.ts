import { BlockContent } from "@/sanity.types";
export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  stripeCustomerId: string;
  stripePaymentIntentId: string;
  stripeCheckoutSessionId: string;
  totalPrice: number;
  currency: string;
  status: string;
  clerkUserId: string;
  orderDate: string;
  amountDiscount: number;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  products: Product[] | null;
  items: ProductReference[] | null;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: DescriptionBlock[];
  slug: Slug;
  categories: Category[];
  image: Image;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface Reference {
  _ref: string;
  _type: string;
  _key?: string;
}

export interface ImageAsset {
  _ref: string;
  _type: string;
}

export interface Image {
  _type: string;
  asset: ImageAsset;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Slug {
  current: string;
  _type: string;
}


export interface DescriptionBlock {
  _type: string;
  style: string;
  _key: string;
  markDefs: unknown[];
  children: {
    _type: string;
    marks: string[];
    text: string;
    _key: string;
  }[];
}

export interface ProductReference {
  _key: string;
  quantity: number;
  product: Product;
}
  
  export type PageContent = {
    title?: string;
    slug: string;
    content: BlockContent;
  };
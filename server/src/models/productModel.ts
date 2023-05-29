import mongoose, { Document, Schema } from 'mongoose'
import { ISustainability, SustainabilitySchema } from './sustainabilityModel'

export interface IProduct extends Document {
  barcode: string;
  categories: [string];
  name: string;
  description: string;
  sustainability: ISustainability | null;
  image_urls: [string];
}

export interface IProductInitialFormat {
  id: number;
  barcode: string;
  categories: [string];
  gender: string;
  timestamp: string;
  url: string;
  source: string;
  merchant: string;
  country: string;
  name: string;
  description: string;
  brand: string;
  sustainability_labels: [string];
  price: number;
  currency: string;
  image_urls: [string];
  consumer_lifestage: string;
  colors: [string];
  sizes: [string];
  gtin: string | null;
  asi: string | null;
}

const ProductSchema: Schema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true
  },
  categories: {
    type: [String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sustainability: {
    type: SustainabilitySchema
  },
  image_urls: {
    type: [String],
    required: true
  }
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)

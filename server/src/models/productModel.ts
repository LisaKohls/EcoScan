import mongoose, { Document, Schema } from 'mongoose'
import { ISustainability, SustainabilitySchema } from './sustainabilityModel'

export interface IProduct extends Document {
  barcode: string;
  categories: [string];
  name: string;
  description: string;
  sustainability: ISustainability;
  image_urls: [string];
}

const ProductSchema: Schema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true
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
    type: SustainabilitySchema,
    required: true
  },
  image_urls: {
    type: [String],
    required: true
  }
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)

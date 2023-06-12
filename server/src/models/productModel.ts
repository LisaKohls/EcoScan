import mongoose, { Document, Schema } from 'mongoose'
import { ISustainabilityLabels, SustainabilitySchema } from './sustainabilityModel'

export interface IProductInitialFormat {
  barcode: number;
  categories: string[];
  gender: string;
  timestamp: string;
  url: string;
  source: string;
  merchant: string;
  country: string;
  name: string;
  description: string;
  brand: string;
  sustainability_labels: string[];
  price: number;
  currency: string;
  image_urls: string[];
  consumer_lifestage: string;
  colors: string[];
  sizes: string;
  gtin: string | null;
  asi: string | null;
}

export interface IProduct extends Document {
  _id: number;
  categories: string[];
  gender: string;
  timestamp: Date;
  url: string;
  source: string;
  merchant: string;
  country: string;
  name: string;
  description: string;
  brand: string;
  sustainability_labels: string[];
  price: number;
  currency: string;
  image_urls: string[];
  consumer_lifestage: string;
  colors: string[];
  sizes: string[];
  gtin: string;
  asi: string;
  sustainability: ISustainabilityLabels | null;
}

const ProductSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true
    },
    categories: {
      type: [String],
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    merchant: {
      type: String,
      required: true
    },
    country: {
      type: String,
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
    brand: {
      type: String,
      required: true
    },
    sustainability_labels: {
      type: [String],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    image_urls: {
      type: [String],
      required: true
    },
    consumer_lifestage: {
      type: String,
      required: true
    },
    colors: {
      type: [String],
      required: true
    },
    sizes: {
      type: [String],
      required: false
    },
    gtin: {
      type: String,
      required: false
    },
    asi: {
      type: String,
      required: false
    },
    sustainability: {
      type: SustainabilitySchema,
      required: false
    }
  },
  { _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

ProductSchema.virtual('barcode')
  .get(function () {
    return this._id
  })
  .set(function (barcode) {
    this._id = barcode
  })

export const Product = mongoose.model<IProduct>('Product', ProductSchema)

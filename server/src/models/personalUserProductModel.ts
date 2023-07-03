import mongoose, { Document, Schema } from 'mongoose'
import { SustainabilitySchema } from './sustainabilityModel'

export interface IPersonalUserProduct extends Document {
  _id: number;
  name: string;
  description: string;
}

const PersonalUserProductSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: Number,
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
      required: false
    }
  },
  {
    _id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

PersonalUserProductSchema.virtual('barcode')
  .get(function () {
    return this._id
  })
  .set(function (barcode) {
    this._id = barcode
  })

export const PersonalUserProduct = mongoose.model<IPersonalUserProduct>(
  'PersonalUserProduct',
  PersonalUserProductSchema
)

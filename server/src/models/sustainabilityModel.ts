import mongoose, { Document, Schema } from 'mongoose'

export interface ISustainability extends Document {
  name: string;
  eco_chemicals: number;
  eco_lifetime: number;
  eco_water: number;
  eco_inputs: number;
  eco_quality: number;
  eco_energy: number;
  eco_waste_air: number;
  eco_environmental_management: number;
  social_labour_rights: number;
  social_business_practice: number;
  social_social_rights: number;
  social_company_responsibility: number;
  social_conflict_minerals: number;
}

const SustainabilitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  eco_chemicals: {
    type: Number,
    required: true
  },
  eco_lifetime: {
    type: Number,
    required: true
  },
  eco_water: {
    type: Number,
    required: true
  },
  eco_inputs: {
    type: Number,
    required: true
  },
  eco_quality: {
    type: Number,
    required: true
  },
  eco_energy: {
    type: Number,
    required: true
  },
  eco_waste_air: {
    type: Number,
    required: true
  },
  eco_environmental_management: {
    type: Number,
    required: true
  },
  social_labour_rights: {
    type: Number,
    required: true
  },
  social_business_practice: {
    type: Number,
    required: true
  },
  social_social_rights: {
    type: Number,
    required: true
  },
  social_company_responsibility: {
    type: Number,
    required: true
  },
  social_conflict_minerals: {
    type: Number,
    required: true
  }
})

export const Sustainability = mongoose.model<ISustainability>('Sustainability', SustainabilitySchema)

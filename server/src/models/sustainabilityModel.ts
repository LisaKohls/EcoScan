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
  ref: string;
}

export interface ISustainabilityInitialFormat {
  id: string;
  timestamp: string;
  name: string;
  description: string;
  cred_credibility: number;
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

export const SustainabilitySchema: Schema = new Schema({
  name: {
    type: String
  },
  eco_chemicals: {
    type: Number
  },
  eco_lifetime: {
    type: Number,
    default: 0
  },
  eco_water: {
    type: Number,
    default: 0
  },
  eco_inputs: {
    type: Number,
    default: 0
  },
  eco_quality: {
    type: Number,
    default: 0
  },
  eco_energy: {
    type: Number,
    default: 0
  },
  eco_waste_air: {
    type: Number,
    default: 0
  },
  eco_environmental_management: {
    type: Number,
    default: 0
  },
  social_labour_rights: {
    type: Number,
    default: 0
  },
  social_business_practice: {
    type: Number,
    default: 0
  },
  social_social_rights: {
    type: Number,
    default: 0
  },
  social_company_responsibility: {
    type: Number,
    default: 0
  },
  social_conflict_minerals: {
    type: Number,
    default: 0
  },
  ref: {
    type: String
  }
})

export const Sustainability = mongoose.model<ISustainability>(
  'Sustainability',
  SustainabilitySchema
)

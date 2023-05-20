import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../models/productModel'
import {
  ISustainability,
  ISustainabilityInitialFormat,
  Sustainability
} from '../models/sustainabilityModel'

export class Converter {
  public static toProduct (
    initialFormat: IProductInitialFormat,
    sustainability: ISustainability | undefined
  ): IProduct {
    const product = new Product()

    product.barcode = ''
    product.categories = initialFormat.categories
    product.name = initialFormat.name
    product.description = initialFormat.description
    product.sustainability = sustainability ?? null
    product.image_urls = initialFormat.image_urls

    return product
  }

  public static toSustainability (
    initialFormat: ISustainabilityInitialFormat
  ): ISustainability {
    const sustainability = new Sustainability()

    sustainability.name = initialFormat.name
    sustainability.eco_chemicals = initialFormat.eco_chemicals
    sustainability.eco_lifetime = initialFormat.eco_lifetime
    sustainability.eco_water = initialFormat.eco_water
    sustainability.eco_inputs = initialFormat.eco_inputs
    sustainability.eco_quality = initialFormat.eco_quality
    sustainability.eco_energy = initialFormat.eco_energy
    sustainability.eco_waste_air = initialFormat.eco_waste_air
    sustainability.eco_environmental_management =
      initialFormat.eco_environmental_management
    sustainability.social_labour_rights = initialFormat.social_labour_rights
    sustainability.social_business_practice =
      initialFormat.social_business_practice
    sustainability.social_social_rights = initialFormat.social_social_rights
    sustainability.social_company_responsibility =
      initialFormat.social_company_responsibility
    sustainability.social_conflict_minerals =
      initialFormat.social_conflict_minerals
    sustainability.ref = initialFormat.id

    return sustainability
  }
}

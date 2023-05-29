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

    product.barcode = '123'
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
    sustainability.eco_chemicals = initialFormat.eco_chemicals ?? 0
    sustainability.eco_lifetime = initialFormat.eco_lifetime ?? 0
    sustainability.eco_water = initialFormat.eco_water ?? 0
    sustainability.eco_inputs = initialFormat.eco_inputs ?? 0
    sustainability.eco_quality = initialFormat.eco_quality ?? 0
    sustainability.eco_energy = initialFormat.eco_energy ?? 0
    sustainability.eco_waste_air = initialFormat.eco_waste_air ?? 0
    sustainability.eco_environmental_management =
      initialFormat.eco_environmental_management ?? 0
    sustainability.social_labour_rights =
      initialFormat.social_labour_rights ?? 0
    sustainability.social_business_practice =
      initialFormat.social_business_practice ?? 0
    sustainability.social_social_rights =
      initialFormat.social_social_rights ?? 0
    sustainability.social_company_responsibility =
      initialFormat.social_company_responsibility ?? 0
    sustainability.social_conflict_minerals =
      initialFormat.social_conflict_minerals ?? 0
    sustainability.ref = initialFormat.id ?? 0

    return sustainability
  }
}

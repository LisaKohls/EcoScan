import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../models/productModel'
import {
  ISustainabilityLabels,
  ISustainabilityInitialFormat,
  Sustainability
} from '../models/sustainabilityModel'

export class Converter {
  public static toProduct (
    initialFormat: IProductInitialFormat,
    sustainability: ISustainabilityLabels | undefined
  ): IProduct {
    const product = new Product({
      barcode: initialFormat.barcode,
      categories: initialFormat.categories,
      name: initialFormat.name,
      description: initialFormat.description,
      sustainability: sustainability ?? null,
      image_urls: initialFormat.image_urls
    })

    return product
  }

  public static toSustainability (
    initialFormat: ISustainabilityInitialFormat
  ): ISustainabilityLabels {
    const sustainability = new Sustainability({
      name: initialFormat.name,
      eco_chemicals: initialFormat.eco_chemicals ?? 0,
      eco_lifetime: initialFormat.eco_lifetime ?? 0,
      eco_water: initialFormat.eco_water ?? 0,
      eco_inputs: initialFormat.eco_inputs ?? 0,
      eco_quality: initialFormat.eco_quality ?? 0,
      eco_energy: initialFormat.eco_energy ?? 0,
      eco_waste_air: initialFormat.eco_waste_air ?? 0,
      eco_environmental_management:
        initialFormat.eco_environmental_management ?? 0,
      social_labour_rights: initialFormat.social_labour_rights ?? 0,
      social_business_practice: initialFormat.social_business_practice ?? 0,
      social_social_rights: initialFormat.social_social_rights ?? 0,
      social_company_responsibility:
        initialFormat.social_company_responsibility ?? 0,
      social_conflict_minerals: initialFormat.social_conflict_minerals ?? 0,
      ref: initialFormat.id ?? 0
    })

    return sustainability
  }
}

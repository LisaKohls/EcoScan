import { Product } from '../models/productModel'

export const getProductByBarcodeService = async (barcode: string) => {
  return Product.findOne(
    { barcode },
    {
      _id: false,
      name: true,
      barcode: true,
      categories: true,
      description: true,
      image: { $first: '$image_urls' },
      sustainabilityName: '$sustainability.name',
      sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 0] },
      sustainabilityEcoLifetime: {
        $ifNull: ['$sustainability.eco_lifetime', 0]
      },
      sustainabilityEco: {
        $avg: [
          { $ifNull: ['$sustainability.eco_chemicals', 0] },
          { $ifNull: ['$sustainability.eco_lifetime', 0] },
          { $ifNull: ['$sustainability.eco_water', 0] },
          { $ifNull: ['$sustainability.eco_inputs', 0] },
          { $ifNull: ['$sustainability.eco_quality', 0] },
          { $ifNull: ['$sustainability.eco_energy', 0] },
          { $ifNull: ['$sustainability.eco_waste_air', 0] },
          { $ifNull: ['$sustainability.eco_environmental_management', 0] }
        ]
      },
      sustainabilitySocial: {
        $avg: [
          { $ifNull: ['$sustainability.social_labour_rights', 0] },
          { $ifNull: ['$sustainability.social_business_practice', 0] },
          { $ifNull: ['$sustainability.social_social_rights', 0] },
          { $ifNull: ['$sustainability.social_company_responsibility', 0] },
          { $ifNull: ['$sustainability.social_conflict_minerals', 0] }
        ]
      }
    }
  )
}

export const getFilteredProductsService = async (name: string) => {
  return Product.aggregate([
    {
      $match: { name: { $regex: name, $options: 'i' } }
    },
    {
      $project: {
        _id: true,
        name: true,
        barcode: true,
        categories: true,
        description: true,
        image: { $first: '$image_urls' },
        sustainabilityName: '$sustainability.name',
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 0] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 0]
        },
        sustainabilityEco: {
          $avg: [
            { $ifNull: ['$sustainability.eco_chemicals', 0] },
            { $ifNull: ['$sustainability.eco_lifetime', 0] },
            { $ifNull: ['$sustainability.eco_water', 0] },
            { $ifNull: ['$sustainability.eco_inputs', 0] },
            { $ifNull: ['$sustainability.eco_quality', 0] },
            { $ifNull: ['$sustainability.eco_energy', 0] },
            { $ifNull: ['$sustainability.eco_waste_air', 0] },
            { $ifNull: ['$sustainability.eco_environmental_management', 0] }
          ]
        },
        sustainabilitySocial: {
          $avg: [
            { $ifNull: ['$sustainability.social_labour_rights', 0] },
            { $ifNull: ['$sustainability.social_business_practice', 0] },
            { $ifNull: ['$sustainability.social_social_rights', 0] },
            { $ifNull: ['$sustainability.social_company_responsibility', 0] },
            { $ifNull: ['$sustainability.social_conflict_minerals', 0] }
          ]
        }
      }
    }
  ])
}

export const updateProductByBarcodeService = async (
    barcode: string,
    updatedFields: any
) => {
  return Product.findOneAndUpdate(
      {barcode},
      {$set: updatedFields},
      {new: true}
  );
}

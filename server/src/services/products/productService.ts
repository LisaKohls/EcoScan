import { IProduct, Product } from '../../models/productModel'
import userModel from '../../models/userModel'
import { getAverageSustainability, isFavorite } from './productHelperService'
import { Sustainability } from '../../models/sustainabilityModel'

export const getProductByBarcodeService = async (
  barcode: number,
  username: string
) => {
  const product = await Product.aggregate([
    { $match: { _id: barcode } },
    {
      $project: {
        _id: 0,
        name: 1,
        barcode: '$_id',
        categories: 1,
        description: 1,
        price: 1,
        currency: 1,
        url: 1,
        source: 1,
        image: { $arrayElemAt: ['$image_urls', 0] },
        sustainabilityName: '$sustainability.name',
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 17] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 95]
        },
        sustainabilityEco: getAverageSustainability('eco'),
        sustainabilitySocial: getAverageSustainability('social')
      }
    }
  ]).exec()

  if (product.length > 0) {
    const favorite = await isFavorite(username, barcode)
    return { ...product[0], favorite }
  }

  return null
}

export const getAllProductsService = async () => {
  try {
    const products = await Product.find()
    return products
  } catch (error: any) {
    throw new Error(`Error occurred while getting products: ${error.message}`)
  }
}

export const getFilteredProductsService = async (
  filter: string,
  username: string
) => {
  const barcode = Number(filter)
  const isNaNBarcode = isNaN(barcode)

  const products = await Product.aggregate([
    {
      $addFields: {
        str_id: { $toString: '$_id' }
      }
    },
    {
      $match: {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { str_id: isNaNBarcode ? '0' : { $regex: filter, $options: 'i' } }
        ]
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        barcode: '$_id',
        categories: 1,
        description: 1,
        image: { $first: '$image_urls' },
        sustainabilityName: '$sustainability.name',
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 45] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 69]
        },
        sustainabilityEco: getAverageSustainability('eco'),
        sustainabilitySocial: getAverageSustainability('social')
      }
    }
  ]).exec()

  const user = await userModel.findOne({ username }).lean()
  const userFavorites = user ? user.favorites : []
  return products.map((product: any) => ({
    ...product,
    favorite: userFavorites.includes(product.barcode)
  }))
}

export const updateProductByBarcodeService = async (
  barcode: string,
  updatedFields: any
) => {
  return Product.findOneAndUpdate(
    { _id: barcode },
    { $set: updatedFields },
    { new: true }
  )
}

export const createProductService = async (productData: any) => {
  const {
    barcode,
    name,
    gender,
    url,
    source,
    merchant,
    categories,
    description,
    country,
    brand,
    price,
    currency,
    imageUrls,
    colors,
    sustainabilityName,
    sustainabilityEco,
    sustainabilitySocial,
    consumerLifestage
  } = productData

  const sustainability = new Sustainability({
    name: sustainabilityName,
    eco_chemicals: sustainabilityEco,
    eco_lifetime: sustainabilityEco,
    eco_water: sustainabilityEco,
    eco_inputs: sustainabilityEco,
    eco_quality: sustainabilityEco,
    eco_energy: sustainabilityEco,
    eco_waste_air: sustainabilityEco,
    eco_environmental_management: sustainabilityEco,
    social_labour_rights: sustainabilitySocial,
    social_business_practice: sustainabilitySocial,
    social_social_rights: sustainabilitySocial,
    social_company_responsibility: sustainabilitySocial,
    social_conflict_minerals: sustainabilitySocial
  })

  const product = new Product({
    barcode,
    categories,
    timestamp: Date(),
    source,
    merchant,
    url,
    country,
    description,
    brand,
    price,
    currency,
    image_urls: imageUrls,
    colors,
    gender,
    name,
    sustainability,
    consumer_lifestage: consumerLifestage
  })

  const savedProduct = await product.save()
  return savedProduct
}

export const deleteProductByBarcodeService = async (barcode: string) => {
  const product = await Product.findOneAndRemove({ _id: barcode })
  return product
}

export const checkProductExists = async (barcode: number): Promise<boolean> => {
  const product: IProduct | null = await Product.findOne({ _id: barcode })
  return !!product
}

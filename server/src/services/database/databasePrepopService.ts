import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../../models/productModel'
import productJson from '../../resources/product.json'
import { ISustainabilityLabels } from '../../models/sustainabilityModel'
import { getInitialSustainabilities } from '../../controllers/sustainability/sustainabilityController'
import { Converter } from '../../utils/converter'

export const prePopulateDataToDB = async () => {
  const count = await Product.countDocuments()
  if (count === 0) {
    for (const productData of productJson) {
      if (productData.barcode) {
        const product = new Product(productData)
        await product.save()
      } else {
        console.error('Error: missing barcode for product', productData)
      }
    }
    console.log('Initial Products successfully created')
  } else {
    console.log('DB was already initialized')
  }
}

export function getInitialProducts (): IProduct[] {
  try {
    const initialSustainabilityLabels: ISustainabilityLabels[] =
      getInitialSustainabilities()
    const productJsonFormat: IProductInitialFormat[] = productJson

    return productJsonFormat.map(p => {
      const sustainabilityLabels = initialSustainabilityLabels.find(susLabel =>
        p.sustainability_labels.some(label => label === susLabel.ref)
      )
      return Converter.toProduct(p, sustainabilityLabels)
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

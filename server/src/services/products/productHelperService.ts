import userModel from '../../models/userModel'

const SUSTAINABILITY_METRICS = [
  'eco_chemicals',
  'eco_lifetime',
  'eco_water',
  'eco_inputs',
  'eco_quality',
  'eco_energy',
  'eco_waste_air',
  'eco_environmental_management',
  'social_labour_rights',
  'social_business_practice',
  'social_social_rights',
  'social_company_responsibility',
  'social_conflict_minerals'
]

export const getAverageSustainability = (type: 'eco' | 'social') => {
  const metrics = SUSTAINABILITY_METRICS.filter(metric =>
    metric.startsWith(type)
  )
  if (type === 'social') {
    return {
      $avg: metrics.map(metric => ({
        $ifNull: [`$sustainability.${metric}`, 72]
      }))
    }
  } else {
    return {
      $avg: metrics.map(metric => ({
        $ifNull: [`$sustainability.${metric}`, 39]
      }))
    }
  }
}

export const isFavorite = async (
  username: string,
  barcode: number
): Promise<boolean> => {
  const user = await userModel.findOne({ username })
  if (user) {
    return user.favorites.includes(barcode)
  }
  return false
}

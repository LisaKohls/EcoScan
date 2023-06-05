import {
  ISustainability,
  ISustainabilityInitialFormat
} from '../models/sustainabilityModel'
import sustainabilityJson from '../resources/sustainability.json'
import { Converter } from '../utils/converter'

export function getInitialSustainabilities (): ISustainability[] {
  try {
    const sustainabilityJSONFormat: ISustainabilityInitialFormat[] = JSON.parse(
      JSON.stringify(sustainabilityJson)
    )

    return sustainabilityJSONFormat.map(s => Converter.toSustainability(s))
  } catch (error) {
    console.log(error)
    return []
  }
}

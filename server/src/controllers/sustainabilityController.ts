import {
  ISustainabilityLabels,
  ISustainabilityInitialFormat
} from '../models/sustainabilityModel'
import sustainabilityJson from '../resources/sustainabilityLabels.json'
import { Converter } from '../utils/converter'

export function getInitialSustainabilities (): ISustainabilityLabels[] {
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

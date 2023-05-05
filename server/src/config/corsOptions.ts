// corsOptions.ts
import allowedOrigins from './allowedOrigins'

interface CorsCallback {
  (err: Error | null, success?: boolean): void;
}

const corsOptions = {
  origin: (origin: string | undefined, callback: CorsCallback) => {
    if (allowedOrigins.indexOf(<string>origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

export default corsOptions

import jwt from 'jsonwebtoken'

function generateToken (username: string): string {
  const userInfo = { username }
  return jwt.sign(
    { UserInfo: userInfo },
    process.env.ACCESS_TOKEN_SECRET as string
  )
}

export default generateToken

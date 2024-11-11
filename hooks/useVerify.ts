import { useSelector } from 'react-redux'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { RootState } from '../store' // Adjust the import according to your project structure

interface DecodedToken extends JwtPayload {
  // Add any additional properties your token might have
}

export default function useVerify(): boolean {
  const { token } = useSelector((state: RootState) => state.user)
  let status: boolean = false

  if (!token) return false

  const verifyCallback: jwt.VerifyCallback = (err, decoded) => {
    if (err) status = false
    if (decoded) status = true
  }

  jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string, verifyCallback)

  return status
}

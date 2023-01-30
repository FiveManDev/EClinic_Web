export interface ITokenDecode {
  role: "Admin" | "Supporter" | "Doctor" | "User"
  iat: string
  UserID: string
  exp: number
  iss: string
  aud: string
}
export interface IToken {
  accessToken: string
  refreshToken: string
}

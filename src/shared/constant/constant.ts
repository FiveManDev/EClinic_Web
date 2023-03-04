export const VERSION = 1
export const DEFAULT_URL_API = "https://localhost:8888"
export const QUERY_KEYS = {
  LOGIN: "LOGIN"
} as const
export const ROLE = {
  USER: "User",
  ADMIN: "Admin",
  DOCTOR: "Doctor",
  SUPPORTER: "Supporter"
} as const
export const URL_API = {
  AUTH: "identity/Authentication",
  ACCOUNT: "identity/Account",
  MAIL: "mail/Mail",
  PROFILE: "profile/Profile",
  RELATIONSHIPS: "profile/Relationship"
} as const
export const LANGUAGE = {
  VIETNAM: "vi",
  ENGLISH: "en"
} as const
export const LOCALSTORAGE = {
  LANGUAGE: "lng"
} as const
export const RELATIONSHIPS = {
  PARENTS: "Cha Mẹ",
  SIBLINGS: "Anh Chị",
  COUPLE: "Vợ Chồng",
  GRANDPARENTS: "Ông Bà",
  BROTHER: "Em",
  ME: "Me",
  CHILREN: "Con cái"
}

export const VERSION = 1
export const DEFAULT_URL_API = "https://localhost:8888"

export const QUERY_KEYS = {
  LOGIN: "LOGIN",
  SERVICE: "SERVICE",
  SPECIALIZATION: "SPECIALIZATION",
  PROFILE: "PROFILE",
  FORUM: {
    POST: "POST_FORUM",
    COMMENT: "COMMENT_FORUM",
    ANSWER: "ANSWER_FORUM"
  },
  HASHTAG: "HASHTAG",
  BLOG: {
    POST: "POST_BLOG",
    HASHTASH: "POST_BLOG_HASHTAG"
  }
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
  SERVICE: "serviceinformation/Service",
  SPECIALIZATION: "serviceinformation/Specialization",
  PROFILE: "profile/Profile",
  PROFILE_OTHER: "profile/Other",
  RELATIONSHIPS: "profile/Relationship",
  FORUM_POST: "forum/Post",
  BLOG_POST: "Blog/Blog",
  BLOG_HASHTAG: "Blog/Hashtag",
  FORUM_POST_COMMENT: "forum/Comment",
  FORUM_POST_ANWERS: "forum/Answer",
  FORUM_POST_HASHTAG: "forum/Hashtag"
} as const
export const DEFAULT_ROUTER = {
  USER: "/user",
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  SUPPORTER: "/sup"
}
export const LANGUAGE = {
  VIETNAM: "Vi",
  ENGLISH: "En"
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
export const PAGE_SIZE = 10

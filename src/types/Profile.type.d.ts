export interface IProfile {
  profileID: string
  userID: string
  firstName: string
  lastName: string
  avatar: string | File | null
  gender: boolean
  dateOfBirth: string
  address: string
  email: string
  phone: string
  bloodType: string
  height: number
  weight: number
}
export interface IProfileDoctor {
  profileID: string
  userID: string
  firstName: string
  lastName: string
  avatar: string
  gender: boolean
  dateOfBirth: string
  address: string
  email: string
  phone: string
  title: string
  workStart: string
}

export interface IRelationShip {
  relationshipID: string
  relationshipName: string
}

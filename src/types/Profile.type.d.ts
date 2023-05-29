export interface Profile {
  profileID: string
  userID: string
  firstName: string
  lastName: string
  avatar: any
  gender: boolean
  dateOfBirth: string
  address: string
  email: string
  phone: string
}

export interface IProfile extends Profile {
  bloodType: string
  height: number
  weight: number
}
export interface IProfileDoctor extends Profile {
  title: string
  workStart: string
  description: string
  specializationID: string
}
export interface IProfileSupporter extends Profile {
  workStart: string
  description: string
}
export interface IProfileExpert extends Profile {
  workStart: string
  description: string
}

export interface IRelationShip {
  relationshipID: string
  relationshipName: string
}

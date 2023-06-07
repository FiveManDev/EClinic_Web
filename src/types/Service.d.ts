export interface Service {
  serviceID: string
  serviceName: any
  price: number
  estimatedTime: number
  isActive: boolean
  specialization: Specialization
  createdAt: string
  updatedAt: string
}
export interface Specialization {
  specializationID: string
  specializationName: string
}
export interface ServicePackage {
  ServicePackageID: string
  ServicePackageName: string
  Description: string
  Image: any
  Price: number
  Discount: number
  PriceDiscount: number
  TotalOrder: number
  EstimatedTime: number
  IsActive: boolean
  CreatedAt: string
  UpdatedAt: string
}
export interface ServicePackageItem {
  ServicePackageID: string
  ServiceID: string
}

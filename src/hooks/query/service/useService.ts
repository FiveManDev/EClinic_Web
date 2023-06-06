import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "shared/constant/constant"
import { IPaginationSearch, IPaging } from "types/Pagination"
import { serviceService } from "../../../services/service.service"
import { Service, Specialization } from "types/Service"

export type CreateServiceItem = Omit<
  Service,
  "serviceID" | "createdAt" | "updatedAt" | "specialization"
> & {
  specializationID: string
}
export type UpdateService = Omit<
  Service,
  "createdAt" | "updatedAt" | "specialization"
> & {
  specializationID: string
}
export type CreateSpecialization = Omit<Specialization, "specializationID">
//Service
export const useSearchServiceForAdQuery = (data: IPaginationSearch) => {
  const queryKey = [
    QUERY_KEYS.SERVICE,
    data.pageNumber,
    data.pageSize,
    data.searchText
  ]
  return useQuery({
    queryKey,
    queryFn: () =>
      serviceService.searchServiceForAd({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        searchText: data.searchText
      })
  })
}
export const useGetServiceByIDForAdQuery = (serviceId: string) => {
  const queryKey = [QUERY_KEYS.SERVICE, serviceId]
  return useQuery({
    queryKey,
    queryFn: () => serviceService.getServiceByIDForAd(serviceId)
  })
}
export const useCreateServiceMutation = () => {
  const createServiceMutation = useMutation({
    mutationFn: (service: CreateServiceItem) =>
      serviceService.createService(service)
  })
  return createServiceMutation
}
export const useUpdateServiceMutation = () => {
  const updateServiceMutation = useMutation({
    mutationFn: (service: UpdateService) =>
      serviceService.updateService(service)
  })
  return updateServiceMutation
}
//Specialization
export const useGetAllSpecializationQuery = (data: IPaging) => {
  const queryKey = [QUERY_KEYS.SPECIALIZATION, data.pageNumber, data.pageSize]
  return useQuery({
    queryKey,
    queryFn: () =>
      serviceService.getAllSpecialization({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize
      })
  })
}
export const useSearchSpecializationQuery = (data: IPaginationSearch) => {
  const queryKey = [
    QUERY_KEYS.SPECIALIZATION,
    data.pageNumber,
    data.pageSize,
    data.searchText
  ]
  return useQuery({
    queryKey,
    queryFn: () =>
      serviceService.searchSpecialization({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        searchText: data.searchText
      })
  })
}
export const useCreateSpecializationMutation = () => {
  const createSpecializationMutation = useMutation({
    mutationFn: (specialization: CreateSpecialization) =>
      serviceService.createSpecialization(specialization)
  })
  return createSpecializationMutation
}
export const useUpdateSpecializationMutation = () => {
  const updateSpecializationMutation = useMutation({
    mutationFn: (specialization: Specialization) =>
      serviceService.updateSpecialization(specialization)
  })
  return updateSpecializationMutation
}

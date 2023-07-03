import { useMutation, useQuery } from "@tanstack/react-query"
import { aiService } from "services/ai.service"
import { QUERY_KEYS } from "shared/constant/constant"
import { DeepLearning, MachineLearning, Model } from "types/AI"

export type ModelAction = Omit<Model, "MachineLearning" | "DeepLearning"> & {
  MachineID: string
  DeepID: string
  file: File
}

export const useGetAllMachineLearningQuery = () => {
  const queryKey = [QUERY_KEYS.AI.MachineLearning]
  return useQuery({
    queryKey,
    queryFn: () => aiService.getAllMachineLearning()
  })
}

export const useUpdateMachineLearningMutation = () =>
  useMutation({
    mutationFn: (data: MachineLearning) => aiService.updateMachineLearning(data)
  })
export const useCreateMachineLearningMutation = () =>
  useMutation({
    mutationFn: (data: string) => aiService.createMachineLearning(data)
  })
export const useGetAllDeepLearningQuery = () => {
  const queryKey = [QUERY_KEYS.AI.DeepLearning]
  return useQuery({
    queryKey,
    queryFn: () => aiService.getAllDeepLearning()
  })
}
export const useUpdateDeepLearningMutation = () =>
  useMutation({
    mutationFn: (data: DeepLearning) => aiService.updateDeepLearning(data)
  })
export const useCreateDeepLearningMutation = () =>
  useMutation({
    mutationFn: (data: string) => aiService.createDeepLearning(data)
  })
//Model
export const useGetAllModelQuery = () => {
  const queryKey = [QUERY_KEYS.AI.Model]
  return useQuery({
    queryKey,
    queryFn: () => aiService.getAllModel()
  })
}
export const useUpdateModelMutation = () =>
  useMutation({
    mutationFn: (data: DeepLearning) => aiService.updateDeepLearning(data)
  })

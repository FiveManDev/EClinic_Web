import { useQuery } from "@tanstack/react-query"
import { chatService } from "services/chat.service"
import { QUERY_KEYS } from "shared/constant/constant"

export const useGetAllMessageOfRoomQuery = (
  pageNumber: number,
  pageSize: number,
  roomId: string
) => {
  const queryKey = [QUERY_KEYS.CHAT.MESSAGE, pageNumber, pageSize, roomId]
  return useQuery({
    queryKey,
    queryFn: () => chatService.getAllMessageOfRoom(pageNumber, pageSize, roomId)
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { upsertRepRecords } from "../api/repRecordsApi";
import { RepRecords } from "../types/RepRecords";
import { repRecordsQueryKey } from "./useRepRecordsQuery";

export function useUpdateRepRecordsMutation() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ repRecords }: { repRecords: RepRecords }) => {
      return upsertRepRecords(repRecords);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: repRecordsQueryKey(userId),
      });
    },
  });
}

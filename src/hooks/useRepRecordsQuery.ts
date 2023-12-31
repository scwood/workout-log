import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "../components/CurrentUserProvider";
import { getRepRecords } from "../api/repRecordsApi";

export function repRecordsQueryKey(userId: string) {
  return ["repRecords", userId];
}

export function useRepRecordsQuery() {
  const { userId } = useCurrentUser();

  return useQuery({
    queryKey: repRecordsQueryKey(userId),
    queryFn: () => getRepRecords(userId),
  });
}

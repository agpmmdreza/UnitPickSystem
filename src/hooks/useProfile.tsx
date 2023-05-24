import {useQuery} from "react-query";
import {getProfile} from "api/auth";
// import { useAuth } from "hooks/useAuth";

// hook that fetch profile
export function useProfile(enabled = true) {
  return useQuery(getProfile.name, getProfile, {
    enabled,
    staleTime: 0,
    cacheTime: 0,
  });
}

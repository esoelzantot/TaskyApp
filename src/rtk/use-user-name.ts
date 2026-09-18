import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { authStorage } from "@/src/storage/auth";

export function useUserName(): string {
  const [userName, setUserName] = useState("");

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      authStorage.getUserName().then((name) => {
        if (!cancelled && name) setUserName(name);
      });

      return () => {
        cancelled = true;
      };
    }, []),
  );

  return userName;
}

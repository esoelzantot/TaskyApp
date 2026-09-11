import { useFocusEffect } from "expo-router/react-navigation";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

type AddButtonHandler = () => void;

interface AddButtonContextValue {
  /** Called by BottomTabBar when the FAB is pressed. */
  triggerAdd: AddButtonHandler;
  setAddButtonHandler: (handler: AddButtonHandler | null) => void;
}

const AddButtonContext = createContext<AddButtonContextValue | undefined>(
  undefined,
);

/** Wrap the Tabs navigator with this once — see app/(tabs)/_layout.tsx. */
export function AddButtonProvider({ children }: { children: ReactNode }) {
  // A ref, not state: switching handlers as screens gain/lose focus
  // shouldn't itself trigger a re-render of anything.
  const handlerRef = useRef<AddButtonHandler | null>(null);

  const setAddButtonHandler = useCallback(
    (handler: AddButtonHandler | null) => {
      handlerRef.current = handler;
    },
    [],
  );

  const triggerAdd = useCallback(() => {
    handlerRef.current?.();
  }, []);

  return (
    <AddButtonContext.Provider value={{ triggerAdd, setAddButtonHandler }}>
      {children}
    </AddButtonContext.Provider>
  );
}

function useAddButtonContext(): AddButtonContextValue {
  const ctx = useContext(AddButtonContext);
  if (!ctx) {
    throw new Error("This hook must be used within an <AddButtonProvider>.");
  }
  return ctx;
}

/** Used once, by BottomTabBar itself, to fire whichever handler is currently registered. */
export function useAddButtonTrigger(): AddButtonHandler {
  return useAddButtonContext().triggerAdd;
}

export function useAddButtonHandler(handler: AddButtonHandler): void {
  const { setAddButtonHandler } = useAddButtonContext();

  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useFocusEffect(
    useCallback(() => {
      setAddButtonHandler(() => handlerRef.current());
      return () => setAddButtonHandler(null);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
}

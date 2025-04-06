import { useSearchParams } from "react-router-dom";

type UseToggleSearchParamReturn = {
  isVisible: boolean;
  toggleParam: () => void;
};

export function useToggleSearchParam(
  key: string,
  value: string = "true"
): UseToggleSearchParamReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const isActive = searchParams.get(key) === value;

  const toggleParam = (): void => {
    const updatedParams = new URLSearchParams(searchParams);

    if (isActive) {
      updatedParams.delete(key);
    } else {
      updatedParams.set(key, value);
    }

    setSearchParams(updatedParams);
  };

  return { isVisible: isActive, toggleParam };
}

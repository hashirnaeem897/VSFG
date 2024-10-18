import gsap from "gsap";
import { useMemo } from "react";

const useGsapContext = (scope: string | object | Element | undefined) => {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return ctx;
};

export default useGsapContext;

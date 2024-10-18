import { useEffect, useLayoutEffect } from "react";

const useLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useLayout;

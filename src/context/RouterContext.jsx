import { createContext, useContext } from "react";

export const RouterContext = createContext({ path: "/", navigate: () => {} });
export const useRouter = () => useContext(RouterContext);



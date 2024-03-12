
import { useAtom } from "jotai";
import { apiUrlAtom } from "../atom";

export function useAuthBaseUrl() {
    const [apiUrl] = useAtom(apiUrlAtom);
    return apiUrl;
}
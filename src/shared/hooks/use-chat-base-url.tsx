
import { useAtom } from "jotai";
import { apiUrlAtom } from "../atom";

export function useChatBaseUrl() {
    const [apiUrl] = useAtom(apiUrlAtom);
    return apiUrl;
}
import { useMutation, useQueryClient } from "react-query";
import { useAuthBaseUrl } from "../shared/hooks/use-auth-base-url";

export interface LoginFormFields {
  email: string;
  password: string;
}

export function useLogin() {
  const baseUrl = useAuthBaseUrl();

  function buildApiEndpoint() {
    const url = baseUrl + "/auth/authenticate";
    return url;
  }

  const login = async (formData: LoginFormFields) => {
    const url = buildApiEndpoint();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login Failed");
    }

    return response.json();
  };
  const queryClient = useQueryClient();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const token = data.accessToken;
      localStorage.setItem("token", token);
      queryClient.invalidateQueries("user");
    },
  });

  return {
    login: async (formData: LoginFormFields) => {
      try {
        return await loginMutation.mutateAsync(formData);
      } catch (error) {
        return error;
      }
    },
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
  };
}

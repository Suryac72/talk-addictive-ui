import { useMutation, useQueryClient } from "react-query";
import { useAuthBaseUrl } from "../shared/hooks/use-auth-base-url";

interface FormFields {
  email: string;
  password: string;
}

export function useLogout() {
  const baseUrl = useAuthBaseUrl();

  function buildApiEndpoint() {
    const url = baseUrl + "/auth/logout";
    return url;
  }

  const logout = async (formData: FormFields) => {
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
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  };
  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries("user");
    },
  });

  return {
    logout: async (formData: FormFields) => {
      try {
        return await logoutMutation.mutateAsync(formData);
      } catch (error) {
        return error;
      }
    },
    isLoading: logoutMutation.isLoading,
    error: logoutMutation.error,
  };
}

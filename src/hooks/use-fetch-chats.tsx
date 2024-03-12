import { useMutation, useQueryClient } from "react-query";
import { useChatBaseUrl } from "../shared/hooks/use-chat-base-url";

interface FormFields {
  userEmail?: string;
}

export function useForgotPassword() {
  const baseUrl = useChatBaseUrl();

  function buildApiEndpoint() {
    const url = baseUrl + "/";
    return url;
  }

  const forgotPassword = async (formData: FormFields) => {
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

  const forgotPasswordMutation = useMutation(forgotPassword, {
    onSuccess: (data) => {
      const token = data.token;
      localStorage.setItem("token", token);
      queryClient.invalidateQueries("user");
    },
  });

  return {
    forgotPassword: async (formData: FormFields) => {
      try {
        return await forgotPasswordMutation.mutateAsync(formData);
      } catch (error) {
         return error;
      }
    },
    isLoading: forgotPasswordMutation.isLoading,
    error: forgotPasswordMutation.error,
  };
}

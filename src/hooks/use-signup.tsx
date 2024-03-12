import { useMutation } from "react-query";
import { useAuthBaseUrl } from "../shared/hooks/use-auth-base-url";

interface FormFields {
    userName: string;
    email : string;
    password: string;
    confirmPassword: string;
    phoneNo: string;
    role?:number;
    status?:boolean;
    pic?:string;
}

export function useSignup() {
  const baseUrl = useAuthBaseUrl();

  function buildApiEndpoint() {
    const url = baseUrl + "/auth/signup";
    return url;
  }

  const signup = async (formData: FormFields) => {
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

  const signupMutation = useMutation(signup);

  return {
    signupUser: signupMutation.mutateAsync,
    isLoading: signupMutation.isLoading,
    error: signupMutation.error,
  };
}

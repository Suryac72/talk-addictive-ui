import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginFormFields, useLogin } from "../../hooks/use-login";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { login, isLoading: isLoginLoading,error:loginError } = useLogin();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormFields>();


  const onSubmit = async (data: LoginFormFields) => {
    try {
      const formData = {
        email: data.email,
        password: data.password,
      };
      const responseData = await login(formData);
      console.log(responseData);
      if (loginError) {
        toast({
              title: "Something went wrong!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
      }
      else{
        toast({
              title: "Login Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            navigate("/chats");
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="10px">
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">
            Email Address <span style={{ color: "red" }}>*</span>
          </FormLabel>
          <Input
            {...register("email", {
              required: "Email required.",
            })}
            type="email"
            placeholder="Enter Your Email Address"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password}>
          <FormLabel>
            Password <span style={{ color: "red" }}>*</span>
          </FormLabel>
          <InputGroup size="md">
            <Input
              {...register("password", {
                required: "Password required.",
              })}
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          type="submit"
          width="100%"
          style={{ marginTop: 15 }}
          isLoading={isLoginLoading}
        >
          Login
        </Button>
        <Button variant="solid" colorScheme="red" width="100%">
          Get Guest User Credentials
        </Button>
      </VStack>
    </form>
  );
}

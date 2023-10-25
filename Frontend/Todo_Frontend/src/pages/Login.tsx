import axios from "axios";
import { useContext, useState } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { AppContext } from "../components/AppContextProvider";
import { toast } from "react-hot-toast";
import { serverLink } from "../main";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsAuth, isAuth, setIsLoading, loading, setUserName } =
    useContext(AppContext);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${serverLink}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setUserName(data.message);
      setIsAuth(true);
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      toast.error("something went wrong");
      setIsLoading(false);
      setIsAuth(false);
    }
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to add your task ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          
        >
          <form onSubmit={handleForm} style={{ width:"100%", border: '0px' }}>
            <Stack spacing={2} >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isDisabled={loading ? true : false}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              New here?{" "}
              <ReactRouterLink color={"blue.400"} to="/register">
                Register
              </ReactRouterLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;

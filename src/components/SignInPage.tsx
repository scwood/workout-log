import { Alert, Button, Flex } from "@mantine/core";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

export function SignInPage() {
  const { signIn, error } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Flex direction="column" gap="md">
        {!!error && <Alert color="red">{error?.message}</Alert>}
        <Button
          size="md"
          color="gray"
          leftSection={<IconBrandGithub />}
          onClick={() => handleSignIn("github")}
        >
          Sign in with GitHub
        </Button>
        <Button
          size="md"
          color="gray"
          leftSection={<IconBrandGoogle />}
          onClick={() => handleSignIn("google")}
        >
          Sign in with Google
        </Button>
      </Flex>
    </>
  );

  async function handleSignIn(provider: "google" | "github") {
    await signIn(provider);
    navigate("/");
  }
}

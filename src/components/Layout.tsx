import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  UnstyledButton,
  Container,
  Flex,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function Layout() {
  return (
    <Container p="lg" size="xs">
      <Flex justify="space-between" align="center">
        <UnstyledButton component={Link} to="/" fz={22} fw="600">
          🏋️‍♂️ Workout log
        </UnstyledButton>
        <Flex gap="xs">
          <ActionIcon
            variant="subtle"
            color="gray"
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/scwood/workout-log"
          >
            <IconBrandGithub />
          </ActionIcon>
        </Flex>
      </Flex>
      <Divider my="md" />
      <Outlet />
    </Container>
  );
}

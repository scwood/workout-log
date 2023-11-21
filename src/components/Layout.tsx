import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  UnstyledButton,
  Container,
  Flex,
  ActionIcon,
  Divider,
  Menu,
} from "@mantine/core";
import { IconBrandGithub, IconLogout, IconUser } from "@tabler/icons-react";

import { useAuth } from "./AuthProvider";

export function Layout() {
  const { signOut, userId, displayName } = useAuth();

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
          {userId && (
            <Menu>
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconUser />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {displayName && <Menu.Item disabled>{displayName}</Menu.Item>}
                <Menu.Item
                  onClick={signOut}
                  leftSection={<IconLogout size={14} />}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>
      </Flex>
      <Divider my="md" />
      <Outlet />
    </Container>
  );
}

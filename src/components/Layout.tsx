import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  UnstyledButton,
  Container,
  Flex,
  ActionIcon,
  Menu,
  Tabs,
} from "@mantine/core";
import { IconBrandGithub, IconLogout, IconUser } from "@tabler/icons-react";

import { useAuth } from "../hooks/useAuth";

export function Layout() {
  const { signOut, userId, displayName } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container p="lg" size="xs">
      <Flex justify="space-between" align="center" mb="md">
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
      {userId && (
        <Tabs mb="md" value={location.pathname} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="/">Current workout</Tabs.Tab>
            <Tabs.Tab value="/history">History</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
      <Outlet />
    </Container>
  );

  function handleTabChange(path: string | null) {
    if (path) {
      navigate(path);
    }
  }
}

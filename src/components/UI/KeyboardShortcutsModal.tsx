import { Drawer, Table, Title, Text, Kbd, Stack } from '@mantine/core';
import { SHORTCUT_DESCRIPTIONS } from '../../constants/keyboardShortcuts';

interface KeyboardShortcutsModalProps {
  opened: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal = ({
  opened,
  onClose,
}: KeyboardShortcutsModalProps) => {
  const shortcuts = Object.entries(SHORTCUT_DESCRIPTIONS).map(
    ([keys, description]) => ({
      keys,
      description,
    })
  );

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>Keyboard Shortcuts</Title>}
      position="right"
      size="md"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Use these keyboard shortcuts to speed up your workflow
        </Text>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Shortcut</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {shortcuts.map((shortcut) => (
              <Table.Tr key={shortcut.keys}>
                <Table.Td>
                  <Kbd>{shortcut.keys}</Kbd>
                </Table.Td>
                <Table.Td>{shortcut.description}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Text size="xs" c="dimmed" ta="center">
          Press <Kbd>Shift</Kbd> + <Kbd>/</Kbd> to toggle this panel
        </Text>
      </Stack>
    </Drawer>
  );
};

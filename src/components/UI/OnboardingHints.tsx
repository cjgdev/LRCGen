import { Paper, Stack, Text, List, ThemeIcon, Title } from '@mantine/core';
import {
  IconUpload,
  IconPlayerPlay,
  IconKeyboard,
  IconDownload,
} from '@tabler/icons-react';

export const OnboardingHints = () => {
  return (
    <Paper p="xl" withBorder style={{ backgroundColor: 'var(--mantine-color-blue-0)' }}>
      <Stack gap="md">
        <div>
          <Title order={3} mb="xs">
            Welcome to LRC Editor! 👋
          </Title>
          <Text size="sm" c="dimmed">
            Create synchronized lyrics for your music in 4 easy steps
          </Text>
        </div>

        <List
          spacing="md"
          size="sm"
          icon={
            <ThemeIcon variant="light" radius="xl" size={24}>
              1
            </ThemeIcon>
          }
        >
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl" variant="light">
                <IconUpload size={14} />
              </ThemeIcon>
            }
          >
            <Text fw={500}>Load your audio file</Text>
            <Text size="xs" c="dimmed">
              Drag & drop or click to upload WAV, MP3, AAC, or FLAC files
            </Text>
          </List.Item>

          <List.Item
            icon={
              <ThemeIcon color="green" size={24} radius="xl" variant="light">
                <IconPlayerPlay size={14} />
              </ThemeIcon>
            }
          >
            <Text fw={500}>Play and mark timestamps</Text>
            <Text size="xs" c="dimmed">
              Press <strong>Enter</strong> when you hear each new lyric line
            </Text>
          </List.Item>

          <List.Item
            icon={
              <ThemeIcon color="orange" size={24} radius="xl" variant="light">
                <IconKeyboard size={14} />
              </ThemeIcon>
            }
          >
            <Text fw={500}>Edit and fine-tune</Text>
            <Text size="xs" c="dimmed">
              Type your lyrics, use keyboard shortcuts for navigation (press{' '}
              <strong>?</strong> to see all)
            </Text>
          </List.Item>

          <List.Item
            icon={
              <ThemeIcon color="violet" size={24} radius="xl" variant="light">
                <IconDownload size={14} />
              </ThemeIcon>
            }
          >
            <Text fw={500}>Export your LRC file</Text>
            <Text size="xs" c="dimmed">
              Press <strong>Cmd/Ctrl+S</strong> or click the export button
            </Text>
          </List.Item>
        </List>

        <Text size="xs" c="dimmed" ta="center">
          💡 Tip: All your work is auto-saved every 30 seconds!
        </Text>
      </Stack>
    </Paper>
  );
};

import { Paper, Button, Group, Text, Stack } from '@mantine/core';
import { IconDownload, IconFileExport } from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';
import { downloadLRC } from '../../utils/lrcExporter';
import { notifications } from '@mantine/notifications';

export const ExportPanel = () => {
  const exportLRC = useAudioStore((state) => state.exportLRC);
  const metadata = useAudioStore((state) => state.metadata);
  const lyrics = useAudioStore((state) => state.lyrics);

  const handleExport = () => {
    if (lyrics.length === 0) {
      notifications.show({
        title: 'No lyrics to export',
        message: 'Add some lyrics before exporting',
        color: 'orange',
      });
      return;
    }

    const lrcContent = exportLRC();
    const filename = metadata.title
      ? `${metadata.title}.lrc`
      : 'untitled.lrc';
    downloadLRC(lrcContent, filename);

    notifications.show({
      title: 'Exported successfully',
      message: `${filename} has been downloaded`,
      color: 'green',
    });
  };

  const handleCopyToClipboard = async () => {
    if (lyrics.length === 0) {
      notifications.show({
        title: 'No lyrics to copy',
        message: 'Add some lyrics first',
        color: 'orange',
      });
      return;
    }

    const lrcContent = exportLRC();
    await navigator.clipboard.writeText(lrcContent);

    notifications.show({
      title: 'Copied to clipboard',
      message: 'LRC content copied successfully',
      color: 'green',
    });
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Text fw={500}>Export</Text>

        {/* Desktop: Two buttons side by side */}
        <Group grow visibleFrom="sm">
          <Button
            leftSection={<IconDownload size={16} />}
            onClick={handleExport}
            disabled={lyrics.length === 0}
          >
            Download LRC
          </Button>

          <Button
            variant="light"
            leftSection={<IconFileExport size={16} />}
            onClick={handleCopyToClipboard}
            disabled={lyrics.length === 0}
          >
            Copy to Clipboard
          </Button>
        </Group>

        {/* Mobile: Stack vertically */}
        <Stack gap="xs" hiddenFrom="sm">
          <Button
            fullWidth
            leftSection={<IconDownload size={16} />}
            onClick={handleExport}
            disabled={lyrics.length === 0}
          >
            Download LRC (Cmd/Ctrl+S)
          </Button>

          <Button
            fullWidth
            variant="light"
            leftSection={<IconFileExport size={16} />}
            onClick={handleCopyToClipboard}
            disabled={lyrics.length === 0}
          >
            Copy to Clipboard
          </Button>
        </Stack>

        <Text size="xs" c="dimmed">
          {lyrics.length} lyric {lyrics.length === 1 ? 'line' : 'lines'} ready
          to export
        </Text>
      </Stack>
    </Paper>
  );
};

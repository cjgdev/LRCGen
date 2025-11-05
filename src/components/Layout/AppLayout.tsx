import { useState } from 'react';
import { Container, Grid, Stack } from '@mantine/core';
import { Header } from './Header';
import { FileImportZone } from '../FileImport/FileImportZone';
import { WaveformPlayer } from '../AudioPlayer/WaveformPlayer';
import { PlaybackControls } from '../AudioPlayer/PlaybackControls';
import { MetadataEditor } from '../LyricsEditor/MetadataEditor';
import { LyricsListView } from '../LyricsEditor/LyricsListView';
import { TimestampEditor } from '../LyricsEditor/TimestampEditor';
import { ExportPanel } from '../UI/ExportPanel';
import { KeyboardShortcutsModal } from '../UI/KeyboardShortcutsModal';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useWaveformPlayer } from '../../hooks/useWaveformPlayer';

export const AppLayout = () => {
  const [showHelp, setShowHelp] = useState(false);
  const { wavesurfer } = useWaveformPlayer();

  useKeyboardShortcuts({
    wavesurfer,
    onToggleHelp: () => setShowHelp((prev) => !prev),
  });

  return (
    <div>
      <Header onShowHelp={() => setShowHelp(true)} />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          <FileImportZone />

          <WaveformPlayer />

          <PlaybackControls />

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="md">
                <MetadataEditor />
                <TimestampEditor />
                <ExportPanel />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              <LyricsListView />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>

      <KeyboardShortcutsModal
        opened={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
};

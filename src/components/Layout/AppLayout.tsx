import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Modal, Text, Group, Button } from '@mantine/core';
import { Header } from './Header';
import { BottomBar } from './BottomBar';
import { FileImportZone } from '../FileImport/FileImportZone';
import { MetadataEditor } from '../LyricsEditor/MetadataEditor';
import { LyricsListView } from '../LyricsEditor/LyricsListView';
import { TimestampEditor } from '../LyricsEditor/TimestampEditor';
import { ExportPanel } from '../UI/ExportPanel';
import { KeyboardShortcutsModal } from '../UI/KeyboardShortcutsModal';
import { OnboardingHints } from '../UI/OnboardingHints';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useWaveformPlayer } from '../../hooks/useWaveformPlayer';
import { useAutoSave } from '../../hooks/useAutoSave';
import { useAudioStore } from '../../stores/audioStore';

export const AppLayout = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const { wavesurfer, togglePlayPause, skip, setPlaybackRate, seekTo } = useWaveformPlayer();
  const { restore, clear, load } = useAutoSave();
  const lyrics = useAudioStore((state) => state.lyrics);
  const audioUrl = useAudioStore((state) => state.audioUrl);
  const showOnboarding = !audioUrl && lyrics.length === 0;

  useKeyboardShortcuts({
    wavesurfer,
    togglePlayPause,
    skip,
    setPlaybackRate,
    seekTo,
    onToggleHelp: () => setShowHelp((prev) => !prev),
  });

  // Check for auto-save on mount
  useEffect(() => {
    const saved = load();
    if (saved && saved.lyrics.length > 0) {
      setShowRestorePrompt(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestore = () => {
    restore();
    setShowRestorePrompt(false);
  };

  const handleDismiss = () => {
    clear();
    setShowRestorePrompt(false);
  };

  return (
    <div>
      <Header onShowHelp={() => setShowHelp(true)} />

      <Container size="xl" py="lg" px="md" style={{ paddingBottom: '22rem' }}>
        <Stack gap="lg">
          <FileImportZone />

          {showOnboarding && <OnboardingHints />}

          {!showOnboarding && (
            <>
              <Grid gutter="lg" style={{ alignItems: 'stretch' }}>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack gap="md">
                    <MetadataEditor />
                    <TimestampEditor />
                    <ExportPanel />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 8 }} style={{ display: 'flex' }}>
                  <LyricsListView />
                </Grid.Col>
              </Grid>
            </>
          )}
        </Stack>
      </Container>

      <KeyboardShortcutsModal
        opened={showHelp}
        onClose={() => setShowHelp(false)}
      />

      <Modal
        opened={showRestorePrompt}
        onClose={() => setShowRestorePrompt(false)}
        title="Restore previous work?"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            We found unsaved work from a previous session. Would you like to
            restore it?
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={handleDismiss}>
              Discard
            </Button>
            <Button onClick={handleRestore}>Restore</Button>
          </Group>
        </Stack>
      </Modal>

      <BottomBar />
    </div>
  );
};

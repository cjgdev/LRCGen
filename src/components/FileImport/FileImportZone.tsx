import { Group, Text, Stack } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconMusic, IconFileText } from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';
import { validateAudioFile, validateTextFile } from '../../utils/validation';
import { parseLRC } from '../../utils/lrcParser';
import { notifications } from '@mantine/notifications';

export const FileImportZone = () => {
  const loadAudioFile = useAudioStore((state) => state.loadAudioFile);
  const setLyrics = useAudioStore((state) => state.setLyrics);
  const updateMetadata = useAudioStore((state) => state.updateMetadata);
  const audioFile = useAudioStore((state) => state.audioFile);

  const handleAudioDrop = (files: File[]) => {
    const file = files[0];
    const validation = validateAudioFile(file);

    if (!validation.valid) {
      notifications.show({
        title: 'Invalid audio file',
        message: validation.message,
        color: 'red',
      });
      return;
    }

    loadAudioFile(file);
    // Set default title from filename
    const filename = file.name.replace(/\.[^/.]+$/, '');
    updateMetadata({ title: filename });

    notifications.show({
      title: 'Audio loaded',
      message: `${file.name} loaded successfully`,
      color: 'green',
    });
  };

  const handleLyricsDrop = async (files: File[]) => {
    const file = files[0];
    const validation = validateTextFile(file);

    if (!validation.valid) {
      notifications.show({
        title: 'Invalid lyrics file',
        message: validation.message,
        color: 'red',
      });
      return;
    }

    try {
      const content = await file.text();

      // Check if it's an LRC file
      if (file.name.endsWith('.lrc')) {
        const { lyrics, metadata } = parseLRC(content);
        setLyrics(lyrics, false); // Don't add import to history
        updateMetadata(metadata);
        notifications.show({
          title: 'LRC imported',
          message: `Loaded ${lyrics.length} lyric lines`,
          color: 'green',
        });
      } else {
        // Plain text - split into lines without timestamps
        const lines = content.split('\n').filter((line) => line.trim());
        const lyrics = lines.map((text) => ({
          id: crypto.randomUUID(),
          timestamp: 0,
          text: text.trim(),
        }));
        setLyrics(lyrics, false); // Don't add import to history
        notifications.show({
          title: 'Lyrics imported',
          message: `Loaded ${lyrics.length} lines (no timestamps)`,
          color: 'blue',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Import failed',
        message: 'Could not read file',
        color: 'red',
      });
    }
  };

  return (
    <Stack gap="md">
      <Dropzone
        onDrop={handleAudioDrop}
        accept={[
          'audio/wav',
          'audio/wave',
          'audio/x-wav',
          'audio/mpeg',
          'audio/mp3',
          'audio/aac',
          'audio/flac',
        ]}
        maxSize={100 * 1024 * 1024} // 100MB
        multiple={false}
      >
        <Group
          justify="center"
          gap="md"
          style={{ minHeight: 120, pointerEvents: 'none', padding: '0.5rem' }}
        >
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <IconMusic size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <Text
              size="xl"
              inline
              fw={500}
              style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}
            >
              {audioFile ? audioFile.name : 'Drag audio file here'}
            </Text>
            <Text
              size="sm"
              c="dimmed"
              inline
              mt={7}
              style={{ fontSize: 'clamp(0.75rem, 3vw, 0.875rem)' }}
            >
              {audioFile
                ? 'Drop a new file to replace'
                : 'WAV, MP3, AAC, or FLAC (max 100MB)'}
            </Text>
          </div>
        </Group>
      </Dropzone>

      <Dropzone
        onDrop={handleLyricsDrop}
        accept={['text/plain', '.lrc']}
        maxSize={1024 * 1024} // 1MB
        multiple={false}
      >
        <Group
          justify="center"
          gap="md"
          style={{ minHeight: 80, pointerEvents: 'none', padding: '0.5rem' }}
        >
          <Dropzone.Accept>
            <IconUpload size={40} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Idle>
            <IconFileText size={40} stroke={1.5} />
          </Dropzone.Idle>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <Text
              size="lg"
              inline
              fw={500}
              style={{ fontSize: 'clamp(0.875rem, 3.5vw, 1.125rem)' }}
            >
              Import lyrics (optional)
            </Text>
            <Text
              size="sm"
              c="dimmed"
              inline
              mt={7}
              style={{ fontSize: 'clamp(0.75rem, 3vw, 0.875rem)' }}
            >
              Drop .lrc or .txt file with lyrics
            </Text>
          </div>
        </Group>
      </Dropzone>
    </Stack>
  );
};

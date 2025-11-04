import { Stack, TextInput, Paper, Text } from '@mantine/core';
import { useAudioStore } from '../../stores/audioStore';

export const MetadataEditor = () => {
  const metadata = useAudioStore((state) => state.metadata);
  const updateMetadata = useAudioStore((state) => state.updateMetadata);

  return (
    <Paper p="md" withBorder>
      <Text fw={500} mb="md">
        Metadata
      </Text>
      <Stack gap="sm">
        <TextInput
          label="Title"
          placeholder="Song title"
          value={metadata.title}
          onChange={(e) => updateMetadata({ title: e.currentTarget.value })}
        />
        <TextInput
          label="Artist"
          placeholder="Artist name"
          value={metadata.artist}
          onChange={(e) => updateMetadata({ artist: e.currentTarget.value })}
        />
        <TextInput
          label="Album"
          placeholder="Album name"
          value={metadata.album}
          onChange={(e) => updateMetadata({ album: e.currentTarget.value })}
        />
        <TextInput
          label="Created by"
          placeholder="Your name"
          value={metadata.creator}
          onChange={(e) => updateMetadata({ creator: e.currentTarget.value })}
        />
      </Stack>
    </Paper>
  );
};

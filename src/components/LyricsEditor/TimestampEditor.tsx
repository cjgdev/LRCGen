import { useState } from 'react';
import {
  Paper,
  Stack,
  Text,
  NumberInput,
  Button,
  Group,
  Divider,
} from '@mantine/core';
import {
  IconAdjustments,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from '@tabler/icons-react';
import { useAudioStore } from '../../stores/audioStore';
import { offsetAllTimestamps } from '../../utils/lyricHelpers';
import { notifications } from '@mantine/notifications';

export const TimestampEditor = () => {
  const [offsetValue, setOffsetValue] = useState<number>(0);
  const lyrics = useAudioStore((state) => state.lyrics);
  const setLyrics = useAudioStore((state) => state.setLyrics);

  const handleApplyOffset = () => {
    if (offsetValue === 0) {
      notifications.show({
        title: 'No offset applied',
        message: 'Offset value is 0',
        color: 'orange',
      });
      return;
    }

    if (lyrics.length === 0) {
      notifications.show({
        title: 'No lyrics',
        message: 'Add some lyrics before adjusting timestamps',
        color: 'orange',
      });
      return;
    }

    const adjustedLyrics = offsetAllTimestamps(lyrics, offsetValue);
    setLyrics(adjustedLyrics);

    notifications.show({
      title: 'Timestamps adjusted',
      message: `All timestamps shifted by ${offsetValue > 0 ? '+' : ''}${offsetValue.toFixed(2)}s`,
      color: 'green',
    });

    setOffsetValue(0);
  };

  const handleQuickOffset = (seconds: number) => {
    if (lyrics.length === 0) {
      notifications.show({
        title: 'No lyrics',
        message: 'Add some lyrics before adjusting timestamps',
        color: 'orange',
      });
      return;
    }

    const adjustedLyrics = offsetAllTimestamps(lyrics, seconds);
    setLyrics(adjustedLyrics);

    notifications.show({
      title: 'Timestamps adjusted',
      message: `All timestamps shifted by ${seconds > 0 ? '+' : ''}${seconds.toFixed(2)}s`,
      color: 'green',
    });
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <div>
          <Text fw={500} mb="xs">
            Batch Timestamp Adjustment
          </Text>
          <Text size="xs" c="dimmed">
            Shift all lyrics forward or backward in time
          </Text>
        </div>

        <Divider />

        <div>
          <Text size="sm" fw={500} mb="xs">
            Quick Adjust
          </Text>
          <Group grow>
            <Button
              variant="light"
              leftSection={<IconPlayerTrackPrev size={16} />}
              onClick={() => handleQuickOffset(-1)}
              disabled={lyrics.length === 0}
            >
              -1.0s
            </Button>
            <Button
              variant="light"
              leftSection={<IconPlayerTrackPrev size={16} />}
              onClick={() => handleQuickOffset(-0.5)}
              disabled={lyrics.length === 0}
            >
              -0.5s
            </Button>
            <Button
              variant="light"
              rightSection={<IconPlayerTrackNext size={16} />}
              onClick={() => handleQuickOffset(0.5)}
              disabled={lyrics.length === 0}
            >
              +0.5s
            </Button>
            <Button
              variant="light"
              rightSection={<IconPlayerTrackNext size={16} />}
              onClick={() => handleQuickOffset(1)}
              disabled={lyrics.length === 0}
            >
              +1.0s
            </Button>
          </Group>
        </div>

        <Divider />

        <div>
          <Text size="sm" fw={500} mb="xs">
            Custom Offset
          </Text>
          <Group>
            <NumberInput
              placeholder="Offset in seconds"
              value={offsetValue}
              onChange={(val) => setOffsetValue(Number(val) || 0)}
              step={0.1}
              decimalScale={2}
              style={{ flex: 1 }}
              suffix="s"
            />
            <Button
              leftSection={<IconAdjustments size={16} />}
              onClick={handleApplyOffset}
              disabled={lyrics.length === 0 || offsetValue === 0}
            >
              Apply Offset
            </Button>
          </Group>
        </div>

        <Text size="xs" c="dimmed">
          {lyrics.length} {lyrics.length === 1 ? 'lyric' : 'lyrics'} will be
          adjusted
        </Text>
      </Stack>
    </Paper>
  );
};

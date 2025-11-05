import { Skeleton, Stack, Box } from '@mantine/core';

export const WaveformSkeleton = () => {
  return (
    <Stack gap="xs">
      <Skeleton height={8} radius="xl" />
      <Skeleton height={128} radius="sm" />
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton height={8} width="10%" radius="xl" />
        <Skeleton height={8} width="10%" radius="xl" />
        <Skeleton height={8} width="10%" radius="xl" />
      </Box>
    </Stack>
  );
};

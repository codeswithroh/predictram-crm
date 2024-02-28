import { Stack, Typography } from '@mui/material';

export default function PageHeader({ title, items }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4">{title}</Typography>
      <Stack direction="row" gap={2}>
        {items}
      </Stack>
    </Stack>
  );
}
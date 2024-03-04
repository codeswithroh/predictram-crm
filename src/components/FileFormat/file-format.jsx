import { Box, Button } from '@mui/material';

import Iconify from '../iconify';

function FileFormat({ gid }) {
  const baseLink =
    'https://docs.google.com/spreadsheets/d/1l4bTw9jxFG3NOaJc46v6mjqcfLvcLt0y-2DUqsxjzYs';
  const viewLink = `${baseLink}/edit#gid=${gid}`;
  const downloadXLSXLink = `${baseLink}/export?format=xlsx&gid=${gid}`;
  const downloadCSVLink = `${baseLink}/export?format=csv&gid=${gid}`;
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { md: 'row', xs: 'column' } }}>
      <Button
        variant="outlined"
        startIcon={<Iconify icon="material-symbols:arrow-outward" />}
        onClick={() => window.open(viewLink)}
      >
        Show Sample File
      </Button>
      <Button
        variant="outlined"
        startIcon={<Iconify icon="material-symbols:sim-card-download-rounded" />}
        onClick={() => window.open(downloadCSVLink)}
      >
        Download Sample CSV
      </Button>
      <Button
        variant="outlined"
        startIcon={<Iconify icon="material-symbols:sim-card-download-rounded" />}
        onClick={() => window.open(downloadXLSXLink)}
      >
        Download Sample Excel
      </Button>
    </Box>
  );
}

export default FileFormat;

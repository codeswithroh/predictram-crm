import { Button, Container,} from '@mui/material';

import PageHeader from 'src/components/pageHeader';

export default function GePUEcoAnalyzerPage() {
  return (
    <Container
      sx={{
        mt: 3,
        bgcolor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        borderRadius: '8px',
        position: 'relative',
      }}
    >

      <PageHeader title="GePUEcoAnalyzer" />

      <Button
        variant="contained"
        sx={{ bgcolor: 'black', color: 'white', mt: 2 }}
        href="https://predictram-gepu-ecoanalyzer.streamlit.app/"
        target="_blank"
      >
        Visit GePUEcoAnalyzer
      </Button>
    </Container>
  );
}

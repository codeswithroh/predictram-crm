import { Button, Container,} from '@mui/material';

import PageHeader from 'src/components/pageHeader';

export default function CGPUPage() {
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

      <PageHeader title="CGPU" />

      <Button
        variant="contained"
        sx={{ bgcolor: 'black', color: 'white', mt: 2 }}
        href="https://predictram-gpt.streamlit.app/"
        target="_blank"
      >
        Visit CGPU
      </Button>
    </Container>
  );
}

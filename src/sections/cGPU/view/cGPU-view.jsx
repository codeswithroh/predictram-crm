import { useState } from 'react';

import { Button, Container,} from '@mui/material';

import PageHeader from 'src/components/pageHeader';

import Nav from '../../../layouts/dashboard/nav';
import Header from '../../../layouts/dashboard/header';

export default function CGPUPage() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
    <Header onOpenNav={() => setOpenNav(true)} />

    <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
      
    <Container
      sx={{
        mt: 3,
        bgcolor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        borderRadius: '8px',
        position: 'relative',
        top: '64px',
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
    </>
  );
}

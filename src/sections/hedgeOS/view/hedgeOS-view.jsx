import { Button, Container, Typography } from '@mui/material';

import PageHeader from 'src/components/pageHeader';

export default function HedgeOSPage() {
  return (
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
      <img
        src="src/sections/hedgeOS/view/photo_6307612031041255745_y.jpg"
        alt="HedgeOS"
        style={{
          width: '500px',
          alignContent: 'center',
          alignItems: 'center',
          height: 'auto',
          borderRadius: '8px 8px 0 0',
          marginBottom: '16px',
        }}
      />

      <PageHeader title="HedgeOS" />

      <Typography variant="h5" gutterBottom>
        A Comprehensive Portfolio Analysis and Visualization Tool
      </Typography>

      <Typography variant="body1" component="ul">
        <Typography component="li">
          In the dynamic and complex world of finance, investors constantly seek innovative tools
          and techniques for portfolio management enhancement.
        </Typography>
        <Typography component="li">
          HedgeOS by PredictRAM is a powerful and versatile solution that empowers investors with
          deep insights into their portfolios through comprehensive analysis and visualization
          capabilities.
        </Typography>
        <Typography component="li">
          By leveraging the principles of Exploratory Data Analysis (EDA), HedgeOS unveils hidden
          patterns, correlations, and trends within a portfolio.
        </Typography>
        <Typography component="li">
          This, in turn, enables investors to make informed decisions and implement effective risk
          mitigation strategies.
        </Typography>
      </Typography>

      <Button
        variant="contained"
        sx={{ bgcolor: 'black', color: 'white', mt: 2 }}
        href="https://predictram-hedgeos.streamlit.app/"
        target="_blank"
      >
        Visit HedgeOS
      </Button>
    </Container>
  );
}

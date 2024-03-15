import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { fDateTime } from 'src/utils/format-time';
import { paisaToRupees } from 'src/utils/convert';

export default function ResponseCard({ data }) {
  return (
    <Grid xs={12} sm={6} md={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card
          variant="outlined"
          style={{
            width: '100%',
            borderRadius: '0.5rem',
            boxShadow: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
          }}
        >
          <Typography sx={{ fontSize: 14, p: 2 }} color="text.secondary" gutterBottom>
            Created at: {fDateTime(data.createdAt)}
          </Typography>
          <CardContent style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="" component="div" color="text.secondary">
                Response details:
              </Typography>
              {data.response !== 'REJECT' && (
                <Typography variant="" component="div">
                  Status:{' '}
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{data.status}</span>
                </Typography>
              )}
              <Typography variant="" component="div">
                Response:{' '}
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{data.response}</span>
              </Typography>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div style={{ width: '50%' }}>
              <Typography variant="" component="div" color="text.secondary">
                Market call details:
              </Typography>
              <Typography variant="" component="div">
                Type:{' '}
                <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {data.marketCall.type.replace(/_/g, ' ')}
                </span>
              </Typography>
              <Typography variant="" component="div">
                Buy Price:{' '}
                <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {paisaToRupees(data.marketCall.buyPrice)}
                </span>
              </Typography>
              <Typography variant="" component="div">
                Target Price:{' '}
                <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {paisaToRupees(data.marketCall.targetPrice)}
                </span>
              </Typography>
              <Typography variant="" component="div">
                Stop loss Price:{' '}
                <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {paisaToRupees(data.marketCall.stopLossPrice)}
                </span>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}

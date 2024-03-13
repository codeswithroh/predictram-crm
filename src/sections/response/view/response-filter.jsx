import { useState } from 'react';

import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function ResponseFilter({ setFilter, filter }) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, fromDate, toDate, page: 0 });
  };
  return (
    <Grid2 sx={{ mb: 2 }} container justifyContent="end" alignItems="center" gap={3}>
      <Grid2
        md={6}
        xs={12}
        container
        justifyContent="flex-end"
        component="form"
        onSubmit={onFormSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid2 sx={{ display: 'flex' }} gap={0.5} alignItems="center">
            <DatePicker
              label="From Date"
              sx={{ borderRadius: 1, width: '100%' }}
              value={fromDate}
              onChange={(sd) => setFromDate(sd)}
              format="DD - MM - YYYY"
            />
            <DatePicker
              label="To Date"
              sx={{ borderRadius: 1, width: '100%' }}
              value={toDate}
              minDate={fromDate}
              onChange={(sd) => setToDate(sd)}
              format="DD - MM - YYYY"
            />
            <Button variant="contained" color="inherit" type="submit">
              Filter
            </Button>
          </Grid2>
        </LocalizationProvider>
      </Grid2>
    </Grid2>

    // <Grid2
    //   sx={{ mb: 2, width: '100%', height: '5rem' }}
    //   container
    //   justifyContent="end"
    //   alignItems="center"
    //   gap={3}
    // >
    //   <Grid2
    //     md={6}
    //     xs={12}
    //     container
    //     gap={0.5}
    //     justifyContent="end"
    //     alignItems="center"
    //     component="form"
    //     onSubmit={onFormSubmit}
    //     sx={{ width: '100%', height: '100%' }}
    //   >
    //     <Grid2 sx={{ display: 'flex' }} gap={0.5}>
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <Card sx={{ borderRadius: 1 }}>
    //           <DatePicker
    //             label="From Date"
    //             sx={{ width: 1 }}
    //             value={fromDate}
    //             onChange={(sd) => setFromDate(sd)}
    //             format="DD - MM - YYYY"
    //           />
    //         </Card>
    //         <Card sx={{ borderRadius: 1 }}>
    //           <DatePicker
    //             label="To Date"
    //             sx={{ width: 1 }}
    //             value={toDate}
    //             minDate={fromDate}
    //             onChange={(sd) => setToDate(sd)}
    //             format="DD - MM - YYYY"
    //           />
    //         </Card>
    //       </LocalizationProvider>
    //       <Button variant="contained" color="inherit" type="submit">
    //         Filter
    //       </Button>
    //     </Grid2>
    //   </Grid2>
    // </Grid2>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  Grid,
  // Stack,
  Divider,
  Container,
  // MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import PageHeader from 'src/components/pageHeader';
// import UserTable from 'src/components/table/BaseTable';
import BaseTable from 'src/components/table/BaseTable';

import { CsvUpload } from '../../../components/form/csv-upload';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);

  const onSubmit = (data) => console.log(data);
  const onInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const lines = reader.result.split('\n');
      const headers = lines[0].split(',');
      const userss = [];

      for (let i = 1; i < lines.length; i += 1) {
        const data = lines[i].split(',');
        const user = {};
        for (let j = 0; j < headers.length; j += 1) {
          user[headers[j].trim()] = data[j].trim();
        }
        userss.push(user);
      }
      setUsers(userss);
    };

    reader.readAsText(file);
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1, px: 3, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              name="name"
              label="Name"
              {...register('firstName')}
              sx={{ width: 1 }}
              required
              inputProps={{ minLength: 3, maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="contact"
              label="Contact"
              {...register('contact')}
              sx={{ width: 1 }}
              required
              inputProps={{ minLength: 10, maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="email"
              label="Email"
              {...register('email')}
              sx={{ width: 1 }}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="address"
              label="Address"
              {...register('address')}
              sx={{ width: 1 }}
              required
              inputProps={{ minLength: 3, maxLength: 50 }}
            />
          </Grid>
        </Grid>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          sx={{ my: 3 }}
        >
          Register
        </LoadingButton>
      </Box>
    </form>
  );

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Organization" />
      <Card>
        <Typography sx={{ fontWeight: 'bold', p: 3 }}>Add Organization Form</Typography>
        <Divider />
        {renderForm}

        <Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        <Box sx={{ p: 3 }}>
          {users.length > 0 ? (
            // <UserTable users={users} />
            <BaseTable tableData={users} />
          ) : (
            <CsvUpload onInputChange={onInputChange} />
          )}
        </Box>
      </Card>
    </Container>
  );
}

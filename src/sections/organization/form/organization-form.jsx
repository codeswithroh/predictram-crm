import * as React from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import PageHeader from 'src/components/pageHeader';

const steps = ['Company details', 'Company Address', 'Primary user details'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Organization" />
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

// import { useForm } from 'react-hook-form';

// import LoadingButton from '@mui/lab/LoadingButton';
// import { Box, Card, Grid, Divider, Container, TextField, Typography } from '@mui/material';

// import PageHeader from 'src/components/pageHeader';

// // ----------------------------------------------------------------------

// export default function RegisterView() {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data) => console.log(data);

//   const renderForm = (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Box sx={{ flexGrow: 1, px: 3, pt: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} lg={6}>
//             <TextField
//               name="name"
//               label="Name"
//               {...register('firstName')}
//               sx={{ width: 1 }}
//               required
//               inputProps={{ minLength: 3, maxLength: 50 }}
//             />
//           </Grid>
//           <Grid item xs={12} lg={6}>
//             <TextField
//               name="contact"
//               label="Contact"
//               {...register('contact')}
//               sx={{ width: 1 }}
//               required
//               inputProps={{ minLength: 10, maxLength: 10 }}
//             />
//           </Grid>
//           <Grid item xs={12} lg={6}>
//             <TextField
//               name="email"
//               label="Email"
//               {...register('email')}
//               sx={{ width: 1 }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} lg={6}>
//             <TextField
//               name="address"
//               label="Address"
//               {...register('address')}
//               sx={{ width: 1 }}
//               required
//               inputProps={{ minLength: 3, maxLength: 50 }}
//             />
//           </Grid>
//         </Grid>
//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           color="inherit"
//           sx={{ my: 3 }}
//         >
//           Register
//         </LoadingButton>
//       </Box>
//     </form>
//   );

//   return (
//     <Container sx={{ mt: 3 }}>
//       <PageHeader title="Organization" />
//       <Card>
//         <Typography sx={{ fontWeight: 'bold', p: 3 }}>Add Organization Form</Typography>
//         <Divider />
//         {renderForm}
//       </Card>
//     </Container>
//   );
// }

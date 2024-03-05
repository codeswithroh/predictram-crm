import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function ForgotPasswordView() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    try {
      if (!otpSent) {
        console.log('Send OTP to:', data.email);
        setOtpSent(true);
      } else {
        console.log('Verify OTP:', data.otp);
        console.log('New Password:', data.newPassword);
        console.log('Confrim Password:', data.confirmpassword);
      }
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" marginBottom={2}>
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={otpSent ? 'column' : 'row'} spacing={3}>
              {!otpSent && (
                <TextField
                  sx={{ width: 1 }}
                  name="email"
                  label="Email"
                  type="email"
                  required
                  {...register('email')}
                />
              )}

               {otpSent && (
                <>
                  <TextField name="otp" label="OTP" required {...register('otp')} />
                  <TextField
                        name="newPassword"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...register('newPassword')}
                        required
                    />
                  <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...register('confirmPassword')}
                        required
                    />
                </>
              )}
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ padding: '10px', marginTop: '20px' }}
            >
              {otpSent ? 'Submit' : 'Send OTP'}
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}

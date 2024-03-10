import { useState } from 'react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

import { Box, Typography } from '@mui/material';

import Iconify from '../iconify';

function ImageUploader({ setImage }) {
  const [imagePath, setImagePath] = useState('');
  const [isHover, setIsHover] = useState(false);

  const compressFile = async (file, options) => {
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (err) {
      return toast.error(err.message);
    }
  };

  const handelImageChoose = async (e) => {
    const reader = new FileReader();

    const image = e.target.files[0];
    if (!image) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
    };

    const file = await compressFile(image, options);

    reader.onload = async (event) => {
      setImagePath(event.target.result);
      // const uploadedImage = await ImageService.upload(image); TODO: Upload To AZURE
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handelDeleteImage = (e) => {
    e.preventDefault();
    setImagePath('');
  };
  return (
    <Box>
      {!imagePath && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ebf4f2',
            height: '100px',
            borderRadius: 2,
            cursor: 'pointer',
          }}
          component="label"
          htmlFor="image-uploader"
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <img alt="upload-icon" src="/assets/icons/image_upload.png" />
            <Typography
              variant="caption"
              sx={{ color: 'text.disabled', fontSize: '15px', fontWeight: 'bold' }}
            >
              Choose Stock Analysis Image for Market Call
            </Typography>
          </Box>
        </Box>
      )}
      {imagePath && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#ebf4f2"
          p={2}
          borderRadius={2}
          position="relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img alt="market-call" height={500} src={imagePath} />
          {isHover && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgcolor="rgba(0, 0, 0, 0.3)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={2}
              gap={2}
            >
              <Box
                border={2}
                p={1}
                borderRadius={100}
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
                component="label"
                htmlFor="image-uploader"
              >
                <Iconify icon="mdi:image-edit-outline" width={50} color="white" />
              </Box>
              <Box
                border={2}
                p={1}
                color="white"
                borderRadius={100}
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handelDeleteImage}
                sx={{ cursor: 'pointer' }}
              >
                <Iconify icon="mdi:image-remove-outline" width={50} color="white" />
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box>
        <input
          id="image-uploader"
          onClick={(e) => {
            e.target.value = '';
          }}
          style={{ display: 'none' }}
          alt="market-call-image"
          type="file"
          accept="image/*"
          onChange={handelImageChoose}
        />
      </Box>
    </Box>
  );
}

export default ImageUploader;

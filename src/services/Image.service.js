import toast from 'react-hot-toast';
import { BlobServiceClient } from '@azure/storage-blob';

class ImageService {
  constructor() {
    this.CONTAINER_NAME = 'researchpaper-image';
    this.SAS_TOKEN =
      'sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-09-10T21:29:24Z&st=2022-09-10T13:29:24Z&spr=https&sig=s3kLJQTP6SPOtOv23vgCecHFMiCsOi7NIorN0XctFuA%3D';
    this.STORAGE_ACCOUNT_NAME = 'ressearchpaper';
    this.upload_url = `https://${this.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${this.SAS_TOKEN}`;

    this.blobService = new BlobServiceClient(
      `https://${this.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${this.SAS_TOKEN}`
    );

    this.containerClient = this.blobService.getContainerClient(this.CONTAINER_NAME);
  }

  async upload(image, options = {}) {
    try {
      const extension = image.name?.split('.')[1];
      const filename = `${Math.random()?.toString(16).substring(2, 8)}.${extension}`;

      const uploadedFile = await this.containerClient.uploadBlockBlob(
        `${filename}`,
        image,
        1,
        options
      );
      return uploadedFile;
    } catch (err) {
      return toast.error(err.message || err);
    }
  }
}

export default new ImageService();

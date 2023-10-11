import { v2 as cloudinary } from 'cloudinary';
import config from 'config';

cloudinary.config({
  cloud_name: config.CLOUD_STORAGE_NAME,
  api_key: config.CLOUD_STORAGE_API_KEY,
  api_secret: config.CLOUD_STORAGE_API_SECRET,
});


export default cloudinary;

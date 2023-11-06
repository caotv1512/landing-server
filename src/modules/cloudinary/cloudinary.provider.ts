// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

require('dotenv').config();
export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dzg2u23iy',
      api_key: '616667831545222',
      api_secret: 'llLgZuXfymDwFOrDu7KO6Jqw4H4',
    });
  },
};

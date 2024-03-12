// import { useState } from 'react';
// import { v2 as cloudinary } from 'cloudinary';
// import { File } from 'buffer';

// interface UploadResult {
//   secure_url: string;
// }
// interface UploadImageOptions {
//     folder: string;
//   }
// export function useUploadImage() {
//   const [cloudinaryConfig,] = useState({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });

//   cloudinary.config(cloudinaryConfig);

//   async function uploadImage(userId: string, imageFile: File): Promise<string> {
//     try {
//       const dataUri = await fileToDataUri(imageFile);
      
//       const uploadResult: UploadResult = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(dataUri, {
//           folder: `users/${userId}`,
//         }, (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         });
//       });
      
//       console.log('Upload Result:', uploadResult);
//       return uploadResult.secure_url;
//     } catch (error) {
//       console.error('Upload Error:', error);
//       throw error;
//     }
//   }

//   async function fileToDataUri(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target && typeof event.target.result === 'string') {
//           resolve(event.target.result);
//         } else {
//           reject(new Error('Failed to read file'));
//         }
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   }

//   return { uploadImage };
// }

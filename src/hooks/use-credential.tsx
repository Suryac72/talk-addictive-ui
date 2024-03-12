import { useEffect, useState } from 'react';


export function useCredentials() {
  const API_KEY: string | undefined = process.env.CLOUDINARY_API_KEY;
  const [apiKey, setApiKey] = useState<string | undefined>(API_KEY);

  useEffect(() => {
    setApiKey(API_KEY);
  }, []);

  return apiKey;
}

export const getEnvVariables = () => {
  return {
    BASE_URL: import.meta.env.VITE_BASE_URL,
  };
};

const api = getEnvVariables().BASE_URL;

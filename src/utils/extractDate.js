import path from 'path';
export const extractDateFromFileName = (finalPath) => {
  const fileName = path.basename(finalPath);

  const match = fileName.match(/\d{4}[-_]?\d{2}[-_]?\d{2}/);

  return match ? match[0] : null;
};

import fs from 'fs/promises';
import path from 'path';

const pathSystem = process.env.FILES_PATH;

export const organizeService = async (path) => {
  try {
    await fs.access(path);

    const files = await fs.readFile(path);

    await Promise.all(
      files.map(async (files) => {
        const fullPath = path.join(path, file);
      })
    );
  } catch (err) {}
};

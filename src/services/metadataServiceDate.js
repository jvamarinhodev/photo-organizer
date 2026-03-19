import fs from 'fs/promises';
import exifParser from 'exif-parser';
import path from 'path';
import pLimit from 'p-limit';
import { extractDateFromFileName } from '../utils/extractDate.js';
import { normalizeDate } from '../utils/normalizeDate.js';

const limit = pLimit(10);

export const metadataServiceDate = async (dir) => {
  const photos = [];

  async function readDirectory(currentDir) {
    const files = await fs.readdir(currentDir, { withFileTypes: true });
    const promises = [];

    for (const file of files) {
      const fullPath = path.join(currentDir, file.name);

      if (file.isDirectory()) {
        await readDirectory(fullPath);
        continue;
      }

      if (file.isFile()) {
        const ext = path.extname(file.name).toLocaleLowerCase();

        if (!['.jpg', '.jpeg', 'png'].includes(ext)) {
          continue;
        }
        
        promises.push(
          limit(async () => {
            try {
              const buffer = await fs.readFile(fullPath);
              const parser = exifParser.create(buffer);
              const result = parser.parse();

              const photosDate =
                result.tags.DateTimeOriginal ??
                result.tags.CreateDate ??
                result.tags.ModifyDate ??
                extractDateFromFileName(fullPath) ??
                (await fs.stat(fullPath)).mtime;

              const lan = result.tags.GPSLatitude ?? null;
              const lon = result.tags.GPSLongitude ?? null;

              const photosDefinitive = {
                fileName: file.name,
                path: fullPath,
                date: normalizeDate(photosDate),
                lat: lan,
                lon: lon,
              };

              return photosDefinitive;
            } catch (err) {
              console.log(`Erro em ${file}:`, err.message);
              return null;
            }
          })
        );
      }
    }
    const resultPhots = await Promise.all(promises);
    photos.push(...resultPhots.filter((p) => p !== null));
  }
  await readDirectory(dir);
  console.log(photos);
};

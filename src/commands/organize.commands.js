import { metadataServiceDate } from '../services/metadataServiceDate.js';

export const registerOrganizeCommand = (program) => {
  program
    .command('organize [path]')
    .option('-o, --output <dir>')
    .action(async (path) => {
      if (!process.env.FILES_PATH) {
        throw new Error('FILES_PATH não definido');
      }

      const finalPath = path || process.env.FILES_PATH;

      metadataServiceDate(finalPath);
    });
};

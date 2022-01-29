import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { from, Observable, of, switchMap } from 'rxjs';

const fs = require('fs');
const { fileTypeFromFile } = require('file-type');

const path = require('path');

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './apps/nest-api/images',
    filename(
      req: any,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) {
      const fileExtension: string = path.extname(file.originalname);
      const fileName: string = uuidv4() + fileExtension;

      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype)
      ? callback(null, true)
      : callback(null, false);
  },
};

export const isFileExtensionSafe = (
  fullFilePath: string
): Observable<boolean> => {
  return from(fileTypeFromFile(fullFilePath)).pipe(
    switchMap(
      (fileExtensionAndMimeType: {
        ext: validFileExtension;
        mime: validMimeType;
      }) => {
        if (!fileExtensionAndMimeType) return of(false);

        const isFileTypeLegit = validFileExtensions.includes(
          fileExtensionAndMimeType.ext
        );
        const isMimeTypeLegit = validMimeTypes.includes(
          fileExtensionAndMimeType.mime
        );
        const isFileLegit: boolean = isFileTypeLegit && isMimeTypeLegit;

        return of(isFileLegit);
      }
    )
  );
};

export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (e) {
    console.error(e);
  }
};

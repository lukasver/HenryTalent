import multer from 'multer';
import tmp from 'tmp';

const tmpobj = tmp.dirSync();

const storage = multer.diskStorage({
  destination: tmpobj.name,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage: storage });

export default uploadFile;

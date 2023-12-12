const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
const { GCLOUD_PROJECT_ID, BUCKET_NAME } = process.env;

const storage = multer.memoryStorage();
const multerUpload = multer({
    storage: storage,
    limmit: {
        fileSize: 5 * 1024 * 1024       // 5 mb limit
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return cb(new Error("Only image allowed"));
        }
        cb(null, true);
    },
});

// storage config
const StorageConfig = {
    projectId: GCLOUD_PROJECT_ID,
    keyFilename: path.join(__dirname, "../imageUpload.json"),
};
const bucketName = BUCKET_NAME;
const bucket = new Storage(StorageConfig).bucket(bucketName);

const uploadToStorage = (file, folder, name) => {
    return new Promise((resolve, reject) => {
        const fileName = `${folder}/${name}/${Date.now}_${path.basename(
            file.originalname
        )}`;

        const fileUpload = bucket.file(fileName);

        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on("error", (error) => {
            reject(error);
        });

        stream.on("finish", () => {
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            resolve(imageUrl);
        });

        stream.end(file.buffer);
    });
};

module.exports = {
    multerUpload,
    uploadToStorage,
    
}
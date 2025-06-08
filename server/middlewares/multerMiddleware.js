const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// set multer storage
const storage = multer.diskStorage({
    destination: async (req, File, cb) => {
        try {
            const userId = req.body.userId || 'temp';
            const tempPath = path.join(__dirname, '..', 'teporary', userId, 'profilePicture');
            await fs.mkdir(tempPath, { recursive: true });
            cb(null, tempPath);
        } catch (err) {
            cb(err, null);
        }
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `profile-${Date.now()}${ext}`;
        cb(null, fileName);
    },
});

// file fillter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg and .png files are allowed'), false);
    }
};

//multer config
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

module.exports = upload;
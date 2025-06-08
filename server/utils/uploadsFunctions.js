const fs = require("fs").promises;
const path = require('path');
const crypto = require('crypto');

const createTempFolder = async (userId) => {
    const tempPath = path.join('temporary', userId, 'profilePicture');
    await fs.mkdir(tempPath, {recursive: true});
    return tempPath;
};

const moveFileToPermanent = async (userId, tempFilePath) => {
    const destDir = path.join('uploads', userId, 'profilePicture');
    await fs.mkdir(destDir, {recursive: true});
    
    const ext = path.extname(tempFilePath);
    const randomName = crypto.randomBytes(16).toString('hex') + ext;
    const destPath = path.join(destDir, randomName);

    await fs.rename(tempFilePath, destPath);
    return destPath;
};

const deleteTempFile = async (filePath) => {
    try{
        await fs.unlink(filePath);
    } catch (err) {
        console.warn(`⚠️  Faild to delete temp file: ${filePath}`, err.message )
    }
};

module.exports = { createTempFolder, moveFileToPermanent, deleteTempFile};

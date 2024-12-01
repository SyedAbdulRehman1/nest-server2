"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryStorage = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_provider_1 = require("./cloudinary.provider");
exports.cloudinaryStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_provider_1.cloudinary,
    params: {
        folder: 'courses',
        format: async () => 'jpeg',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});
//# sourceMappingURL=cloudinary-storage.js.map
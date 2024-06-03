// // middleware/multer.js
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require('multer');

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage });

module.exports = upload;

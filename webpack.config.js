import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './bugbuddy.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bugbuddy.js'
    },
    target: 'node', // Specifies the target environment as Node.js
    mode: 'production' // Set the mode for optimized builds
};

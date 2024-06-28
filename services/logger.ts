import fs from 'fs';
import path from 'path';

const logFilePath = path.resolve(process.cwd(), 'error-logs.txt');

export const logError = (error: Error) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - Error: ${error.message}\n`;

    fs.appendFile(logFilePath, logMessage, err =>
        err ? console.error('Failed to write to log file:', err) : console.log('Error logged successfully.')
    );
};
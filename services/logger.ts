import path from 'path';

const logFilePath = path.resolve(process.cwd(), 'error-logs.txt');

export const logError = (error: Error) => {
    typeof window === 'undefined'
        ? (require('fs').appendFileSync(logFilePath, `${new Date().toISOString()} - ${error.stack}\n`))
        : console.error(error);
};
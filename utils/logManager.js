import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'data', 'log.json'); // or use path.resolve

export function readLogs() {
  try {
    const data = fs.readFileSync(logFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export function appendLog(entry) {
  const logs = readLogs();
  logs.push(entry);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}

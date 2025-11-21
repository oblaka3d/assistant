// import { ChildProcess } from 'child_process';
import { createArecordProcess, combineBuffers, AudioProcess } from './audio-utils';

let recordingProcess: AudioProcess | null = null;

export async function startRecord(): Promise<void> {
  if (recordingProcess) {
    throw new Error('Recording already in progress');
  }

  try {
    recordingProcess = createArecordProcess();
    console.log('Recording started');
  } catch (error) {
    recordingProcess = null;
    throw new Error(`Failed to start recording: ${error}`);
  }
}

export async function stopRecord(): Promise<Buffer> {
  if (!recordingProcess) {
    throw new Error('No recording in progress');
  }

  return new Promise<Buffer>((resolve, reject) => {
    const { process, buffer } = recordingProcess!;

    process.on('close', (code: number | null) => {
      if (code === null || code === 0 || code === 1) {
        const audioBuffer = combineBuffers(buffer);
        recordingProcess = null;
        console.log(`Recording stopped. Buffer size: ${audioBuffer.length} bytes`);
        resolve(audioBuffer);
      } else {
        recordingProcess = null;
        reject(new Error(`arecord exited with code ${code}`));
      }
    });

    process.kill('SIGINT');
  });
}

export function isRecording(): boolean {
  return recordingProcess !== null;
}


import { spawn, ChildProcess } from 'child_process';
import { config } from './config';

export interface AudioProcess {
  process: ChildProcess;
  buffer: Buffer[];
}

export function createArecordProcess(): AudioProcess {
  const buffer: Buffer[] = [];
  const arecordArgs = [
    '-f',
    config.audio.format,
    '-r',
    config.audio.sampleRate.toString(),
    '-c',
    config.audio.channels.toString(),
    '-D',
    config.audio.device,
  ];

  const process = spawn('arecord', arecordArgs);

  process.stdout?.on('data', (chunk: Buffer) => {
    buffer.push(chunk);
  });

  process.stderr?.on('data', (data: Buffer) => {
    console.error('arecord stderr:', data.toString());
  });

  process.on('error', (error: Error) => {
    console.error('arecord error:', error);
  });

  return { process, buffer };
}

export function createAplayProcess(audioBuffer: Buffer): ChildProcess {
  const aplayArgs = [
    '-f',
    config.audio.format,
    '-r',
    config.audio.sampleRate.toString(),
    '-c',
    config.audio.channels.toString(),
    '-D',
    config.audio.device,
  ];

  const process = spawn('aplay', aplayArgs);

  process.stdin?.write(audioBuffer);
  process.stdin?.end();

  process.stderr?.on('data', (data: Buffer) => {
    console.error('aplay stderr:', data.toString());
  });

  process.on('error', (error: Error) => {
    console.error('aplay error:', error);
  });

  return process;
}

export function combineBuffers(buffers: Buffer[]): Buffer {
  return Buffer.concat(buffers);
}


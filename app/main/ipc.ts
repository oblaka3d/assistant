import { ipcMain } from 'electron';
import { startRecord, stopRecord } from '../backend/voice';
import { transcribe } from '../backend/stt';
import { generateResponse } from '../backend/llm';
import { synthesize } from '../backend/tts';

export function setupIPC(): void {
  ipcMain.handle('startRecord', async (): Promise<void> => {
    try {
      await startRecord();
    } catch (error) {
      console.error('Error starting record:', error);
      throw error;
    }
  });

  ipcMain.handle('stopRecord', async (): Promise<Buffer> => {
    try {
      const buffer = await stopRecord();
      return buffer;
    } catch (error) {
      console.error('Error stopping record:', error);
      throw error;
    }
  });

  ipcMain.handle('transcribe', async (_event, audioBuffer: Buffer): Promise<string> => {
    try {
      const text = await transcribe(audioBuffer);
      return text;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  });

  ipcMain.handle('askLLM', async (_event, text: string): Promise<string> => {
    try {
      const response = await generateResponse(text);
      return response;
    } catch (error) {
      console.error('Error asking LLM:', error);
      throw error;
    }
  });

  ipcMain.handle('speak', async (_event, text: string): Promise<void> => {
    try {
      await synthesize(text);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      throw error;
    }
  });
}


// src/lib/pollyClient.ts
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { useMutation } from '@tanstack/react-query';

const polly = new PollyClient({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_POLLY_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_POLLY_SECRET_KEY,
  },
});

async function getSpeechBlob(text: string): Promise<Blob> {
  const cmd = new SynthesizeSpeechCommand({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Seoyeon',
    LanguageCode: 'ko-KR',
    Engine: 'neural',
  });
  const { AudioStream } = await polly.send(cmd);

  if (!AudioStream) throw new Error('TTS 실패');

  const chunks: Uint8Array[] = [];
  for await (const chunk of AudioStream as any) {
    chunks.push(chunk);
  }
  return new Blob(chunks, { type: 'audio/mpeg' });
}

export default function usePollySpeechMutation() {
  return useMutation({
    mutationFn: (text: string) => getSpeechBlob(text),
  });
}

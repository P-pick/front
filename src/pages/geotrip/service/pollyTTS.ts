// src/lib/pollyClient.ts
import {
  PollyClient,
  SynthesizeSpeechCommand,
  VoiceId,
} from '@aws-sdk/client-polly';
import { useMutation } from '@tanstack/react-query';

const polly = new PollyClient({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_POLLY_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_POLLY_SECRET_KEY,
  },
});

const getSpeechBlob = async ({
  text,
  voiceId,
}: {
  text: string;
  voiceId: VoiceId;
}): Promise<Blob> => {
  const cmd = new SynthesizeSpeechCommand({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: voiceId,
    LanguageCode: 'ko-KR',
    Engine: 'neural',
  });

  const { AudioStream } = await polly.send(cmd);

  if (!AudioStream) throw new Error('TTS 실패');

  const chunks: Uint8Array[] = [];
  const reader = (AudioStream as ReadableStream).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return new Blob(chunks, { type: 'audio/mpeg' });
};

const usePollySpeechMutation = ({ voiceId }: { voiceId: VoiceId }) => {
  return useMutation({
    mutationFn: (text: string) => getSpeechBlob({ text, voiceId }),
  });
};

export default usePollySpeechMutation;

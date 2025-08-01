import { SafeHtmlRenderer } from '@/shared';

interface ExtraInfoProps {
  title: string;
  content: string | undefined;
}

export default function ExtraInfo({ title, content }: ExtraInfoProps) {
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">
        <SafeHtmlRenderer html={content} />
      </p>
    </div>
  );
}

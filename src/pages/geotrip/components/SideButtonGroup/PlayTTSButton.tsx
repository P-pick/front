import useTTS from '../../lib/useTTS';

interface PlayTTSButtonProps {
  text: string;
}

export default function PlayTTSButton({ text }: PlayTTSButtonProps) {
  const { toggleAudio } = useTTS(text);

  return (
    <>
      <button type="button" onClick={toggleAudio}>
        <svg
          className="cursor-pointer"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.8" />
          <path
            d="M22 28.5V26.45C23.5 26.0167 24.7083 25.1833 25.625 23.95C26.5417 22.7167 27 21.3167 27 19.75C27 18.1833 26.5417 16.7833 25.625 15.55C24.7083 14.3167 23.5 13.4833 22 13.05V11C24.0667 11.4667 25.75 12.5125 27.05 14.1375C28.35 15.7625 29 17.6333 29 19.75C29 21.8667 28.35 23.7375 27.05 25.3625C25.75 26.9875 24.0667 28.0333 22 28.5ZM11 22.775V16.775H15L20 11.775V27.775L15 22.775H11ZM22 23.775V15.725C22.7833 16.0917 23.3958 16.6417 23.8375 17.375C24.2792 18.1083 24.5 18.9083 24.5 19.775C24.5 20.625 24.2792 21.4125 23.8375 22.1375C23.3958 22.8625 22.7833 23.4083 22 23.775ZM18 16.625L15.85 18.775H13V20.775H15.85L18 22.925V16.625Z"
            fill="#1F1F1F"
          />
        </svg>
      </button>
    </>
  );
}

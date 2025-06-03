export default function BackButton() {
  return (
    <button type="button" className="cursor-pointer ">
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:scale-110 transition-transform duration-200"
      >
        <circle cx="17.5" cy="17.5" r="17.5" fill="white" fillOpacity="1" />
        <path
          d="M13.825 19L19.425 24.6L18 26L10 18L18 10L19.425 11.4L13.825 17H26V19H13.825Z"
          fill="#2D2D2D"
        />
      </svg>
    </button>
  );
}

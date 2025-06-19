import { TourList } from '@/assets';
import { Link } from 'react-router-dom';
export default function TourListButton() {
  return (
    <Link to="/tour-list">
      <TourList />
    </Link>
  );
}

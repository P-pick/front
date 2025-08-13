import { TourBottomSheet } from '@/features/tour';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TourDetail() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <TourBottomSheet
        title="Tour Detail"
        contentid="1310950"
        contenttypeid="12"
        dist="12312"
        mapx={0}
        mapy={0}
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setTimeout(() => {
            navigate(-1);
          }, 300);
        }}
      />
    </>
  );
}

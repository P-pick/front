export default function TourInfo({ tour }) {
  return (
    <div className="tour-info">
      <h2>{tour.name}</h2>
      <p>{tour.description}</p>
      <p>
        <strong>Duration:</strong> {tour.duration} days
      </p>
      <p>
        <strong>Price:</strong> ${tour.price}
      </p>
      <p>
        <strong>Rating:</strong> {tour.rating} stars
      </p>
    </div>
  );
}

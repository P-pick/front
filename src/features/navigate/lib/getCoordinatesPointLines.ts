const getCoordinatesPointLines = (coords: number[][]) => {
  return coords.map(coord => ({
    lat: coord[1],
    lng: coord[0],
  }));
};

export default getCoordinatesPointLines;

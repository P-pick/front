import type { BusLeg, SubwayLeg, WalkLeg } from './type';

interface TransitLegProps {
  leg: WalkLeg | SubwayLeg | BusLeg;
}

export default function TransitLeg({ leg }: TransitLegProps) {
  if (leg.mode === 'WALK') {
    return null;
  }

  if (leg.mode === 'SUBWAY') {
    return (
      <div className="flex gap-2 justify-start items-start">
        <span
          className="text-white w-4 h-4 p-3 flex justify-center items-center rounded-full"
          style={{ backgroundColor: `#${leg.routeColor}` }}
        >
          {leg.type}
        </span>
        <div>
          <p>{leg.start.name}역</p>
        </div>
      </div>
    );
  }

  if (leg.mode === 'BUS') {
    const [busType, ...busName] = leg.route.split(':');

    return (
      <>
        <div className="flex gap-2 justify-start items-start">
          <span className="w-4 h-4 p-3 flex justify-center items-center rounded-full bg-sky-950"></span>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 justify-start items-center">
              <p>버스 {leg.start.name}</p>
              <p className="text-xs text-gray-400">{leg.routeId}</p>
            </div>
            <div className="flex gap-1 justify- items-center">
              <span className="text-xs bg-green-500 text-white rounded-sm p-[0.1rem]">
                {busType}
              </span>
              <p className="flex gap-1 items-center">
                {busName.map(name => (
                  <span key={name} className="text-xs text-gray-400">
                    {name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <span className="relative left-1.5 top-1.5 w-3 h-3 bg-white flex justify-center items-center rounded-full border-sky-950 border-3"></span>
          <p className="pl-2.5">{leg.end.name}</p>
        </div>
      </>
    );
  }

  return null;
}

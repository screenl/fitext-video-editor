



export default function CurrentFramePole(current_range: [number,number], timestamp: number ){
  return (
  <div className="w-full h-full absolute">
      <div className="w-[2px] h-full border-green-500 bg-green-500" style={{ marginLeft: (((timestamp - current_range[0]) / (current_range[1] - current_range[0])) * 100).toString() + '%' }}></div>
    </div>
  );
}
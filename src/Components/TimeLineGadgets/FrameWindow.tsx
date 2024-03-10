import CurrentFramePole from "./timebar";
import * as Collections from 'typescript-collections';

interface block{
  start: number,
  end: number,
  color: number
}

export function zoomIn(curr_start: number, curr_end: number, now: number, scalar: number){
  if(curr_end-curr_start < 1.5) return [curr_start,curr_end];
  var new_start = curr_start, new_end = curr_end;
  if(now - curr_start > curr_end - now){
    let u = Math.min(2*now-curr_end-curr_start,scalar);
    new_start += u;
    scalar -= u;
  }
  if (now - curr_start < curr_end - now){
    let u = Math.min(curr_end+curr_start-2*now,scalar);
    new_end -= u;
    scalar -= u;
  }
  new_end -= scalar/2;
  new_start += scalar/2;

  return [new_start,new_end];
}

export function zoomOut(curr_start: number, curr_end: number, now: number, scalar: number, vid_end: number){
  var new_start = curr_start, new_end = curr_end;
  if(now - curr_start < curr_end - now){
    let u = Math.min(curr_end+curr_start-2*now, scalar, new_start);
    new_start -= u;
    scalar -= u;
  }
  if (now - curr_start > curr_end - now){
    let u = Math.min(2*now-curr_end-curr_start, scalar, vid_end-new_end);
    new_end += u;
    scalar -= u;
  }
  new_end += Math.min(vid_end-new_end, scalar/2);
  new_start -= Math.min(new_start, scalar/2);

  return [new_start,new_end];
}

export default function FrameWindow(curr_start: number, curr_end: number, now: number){ 
  //examples for testing
  let blocks: block[] = [{
    start: 2,
    end: 4,
    color: 3},
    {
      start: 5,
      end: 8,
      color: 3},
      {
        start: 9,
        end: 12,
        color: 3}
  ];


  let intv_length = (curr_end-curr_start);

  function Scale(){
    var scales = [];
    let small_intv_size = Math.ceil(intv_length/8);
    var last_scale = curr_start;
    for(var i = Math.floor(curr_start)+1; i < curr_end; i += small_intv_size){
      let p = ((i-last_scale)/intv_length * 100).toString()+'%';
      scales.push(
        <div className="flex flex-col justify-end" style={{
          marginLeft: (last_scale==curr_start) ? p : `calc(${p} - 20px)`,
          width: "20px",
          height: "100%"
        }} key={i}>
          <p className="">{Math.round(i*10)/10}</p>
        </div>
      );

      last_scale = i;
    }

    return (
      <div className="h-full w-full flex text-black text-base">
        {scales}
      </div>

    );
  }

  function Blocks(){
    var bs: React.JSX.Element[] = [];
    var last_end = curr_start;
    for(let b of blocks){
      if (b.end >= curr_start && b.start < curr_end){
        bs.push((
          <div className="bg-cyan-500" style={{
            height: "100%",
            marginLeft: ((Math.max(b.start,curr_start)-last_end) / intv_length * 100).toString()+'%',
            width: ((Math.min(b.end,curr_end)-(Math.max(b.start,curr_start))) / intv_length * 100).toString()+'%'
          }} key={b.start}>
          </div>
        ));
        last_end = b.end;
      }
    }


    return (
      <div className="w-full h-full flex">
        {bs}
      </div>
    );

  }
  //use binary search to optimize?

  return (
    <>
    <div className="w-full h-1/5 bg-slate-300">
      {Scale()}
    </div>
    <div className="w-full h-full relative bg-white">
      {CurrentFramePole([curr_start,curr_end],now)}
      {Blocks()}
    </div>
    </>

  );
}
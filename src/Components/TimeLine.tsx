import { Boxes } from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";

export default function TimeLine() {
  return (
    <div className="flex h-64 flex-row content-stretch items-stretch overflow-x-auto">
      <Rows></Rows>
      <div className="flex flex-row content-stretch">
        <Boxes></Boxes>
      </div>
    </div>
  );
}

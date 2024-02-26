import { Boxes } from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";

export default function TimeLine() {
  return (
    <div className="flex flex-row justify-center ">
      <Rows></Rows>
      <Boxes></Boxes>
    </div>
  );
}

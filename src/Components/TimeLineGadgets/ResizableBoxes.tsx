import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

export function Boxes() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-52 min-w-[800px]  rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className=" flex h-full flex-col items-center justify-center ">
          <div className="divider divider-info"></div>
          <span className="font-semibold">Exercsise</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Sets</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Reps</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Duration</span>
          <div className="divider divider-info"></div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle></ResizableHandle>

      <ResizablePanel defaultSize={30}>
        <div className=" flex h-full flex-col items-center justify-center ">
          <div className="divider divider-info"></div>
          <span className="font-semibold">Exercsise</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Sets</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Reps</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Duration</span>
          <div className="divider divider-info"></div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20}>
        <div className=" flex h-full flex-col items-center justify-center ">
          <div className="divider divider-info"></div>
          <button className="btn btn-circle btn-outline btn-info text-2xl">
            +
          </button>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Sets</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Reps</span>
          <div className="divider divider-info"></div>
          <span className="font-semibold">Duration</span>
          <div className="divider divider-info"></div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

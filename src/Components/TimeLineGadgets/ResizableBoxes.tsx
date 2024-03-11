import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

export function Boxes() {
  return (
    <div className="relative w-[5000px]">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-full flex-col rounded-lg border"
      >
        <ResizablePanel
          defaultSize={30}
          className="grid grid-rows-4 justify-items-stretch divide-y"
        >
          <div className="flex items-center justify-center text-center">
            <button className="btn btn-circle btn-outline btn-info text-2xl">
              +
            </button>
          </div>
          <span className="flex items-center justify-center text-center font-semibold">
            Sets
          </span>
          <span className="flex items-center justify-center text-center font-semibold">
            Reps
          </span>
          <span className="flex items-center justify-center text-center font-semibold">
            Duration
          </span>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={30}
          className="grid grid-rows-4 justify-items-stretch divide-y"
        >
          <div className="flex items-center justify-center text-center">
            <button className="btn btn-circle btn-outline btn-info text-2xl">
              +
            </button>
          </div>
          <span className="flex items-center justify-center text-center font-semibold">
            Sets
          </span>
          <span className="flex items-center justify-center text-center font-semibold">
            Reps
          </span>
          <span className="flex items-center justify-center text-center font-semibold">
            Duration
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={30}
          className="grid grid-rows-4 justify-items-stretch divide-y"
        >
          <div className="flex items-center justify-center text-center">
            <button className="btn btn-circle btn-outline btn-info text-2xl">
              +
            </button>
          </div>
          <span className="flex items-center justify-center text-center font-semibold">
            Sets
          </span>
          <span className="flex items-center justify-center text-center font-semibold">
            Reps
          </span>
          <span className="flex items-center justify-center text-center font-semibold">
            Duration
          </span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

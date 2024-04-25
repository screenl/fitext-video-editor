import React from "react";

const PortraitView: React.FC = () => {
  return (
    <div className="ml-2 h-[450px] w-[250px] overflow-y-scroll rounded-lg bg-white p-4">
      {/* 竖屏上半部分留出空白放视频 */}
      <div className="mb-4 h-[200px] rounded-lg bg-gray-200"></div>
      {/* 大的bubble */}
      <div className="mb-4 rounded-lg bg-blue-500 p-2 text-white">
        {/* 两个平行的小bubble */}
        <div className="mb-2 flex justify-between">
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            Set 2/2
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            28 Sec
          </span>
        </div>
        {/* 两个进度条 */}
        <div className="mb-1 h-1 rounded-full bg-white"></div>
        <div className="h-1 rounded-full bg-white"></div>
      </div>
      {/* 三个从上到下的小bubble */}
      <div className="mb-2 rounded-lg bg-gray-200 px-2 py-1 text-gray-800">
        Rest
      </div>
      <div className="mb-2 rounded-lg bg-gray-200 px-2 py-1 text-gray-800">
        Flex Sits
      </div>
      <div className="mb-4 rounded-lg bg-gray-200 px-2 py-1 text-gray-800">
        Leg Curls
      </div>
      {/* 竖屏最下面的长条 */}
      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2">
        <i className="fas fa-map-marker-alt text-gray-500"></i>
        <i className="fas fa-chevron-left text-gray-500"></i>
        <i className="fas fa-pause text-gray-500"></i>
        <i className="fas fa-chevron-right text-gray-500"></i>
      </div>
    </div>
  );
};

export default PortraitView;

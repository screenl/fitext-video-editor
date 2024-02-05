import HomeBar from './HomeBar';

import phone_status_bar from '../../assets/phone_status_bar.svg';
import flip_button from '../../assets/flip_button.svg';
import Image from 'next/image';

export default function VerticalPhone() {
  return (
    <div className="border border-black rounded-[20px] overflow-hidden flex flex-column relative aspect-[5/11] mt-[.5%] mr-auto">
      {/* statusBar on phone for wifi, battery, etc. should be static */}
      <div className="h-[40px] flex absolute">
        <Image
          className="w-[11vw] h-auto"
          src={phone_status_bar}
          alt="Status Bar"
        />
      </div>

      {/* Not sure if this is supposed to be interactive, adding as image for now */}
      <Image
        className="flex absolute right-[5%] top-[6.5%]"
        src={flip_button}
        alt="Flip Button"
      />

      {/* Controls */}
      <div className="w-full flex absolute bottom-0">
        <HomeBar orientation="vertical" />
      </div>
    </div>
  );
}

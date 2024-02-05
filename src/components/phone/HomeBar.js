import target_button from '../../assets/target_button.svg';
import back_button from '../../assets/back_button.svg';
import pause_button from '../../assets/pause_button.svg';
import forward_button from '../../assets/forward_button.svg';
import Image from 'next/image';

// homebar icons on the horizontal and vertical phones
export default function HomeBar({ orientation, togglePlayback }) {
  let orientationClass =
    'w-full flex-col bg-white rounded-[15px] flex justify-between';
  let imgRotation = 'h-[30px] w-[30px] rotate-90';

  if (orientation === 'vertical') {
    orientationClass =
      'w-full h-[50px] bg-white rounded-[15px] flex justify-between';
    imgRotation = '';
  }

  return (
    <div className={orientationClass}>
      <div className="h-[10px] w-[5px]"></div>
      <button>
        <Image
          className={imgRotation}
          src={target_button}
          alt="Target button"
        />
      </button>
      <div className="h-[10px] w-[5px]"></div>

      <button>
        <Image className={imgRotation} src={back_button} alt="Back button" />
      </button>
      <div className="h-[75px] w-[40px]"></div>

      <button onClick={togglePlayback}>
        <Image className={imgRotation} src={pause_button} alt="Pause button" />
      </button>
      <div className="h-[75px] w-[40px]"></div>

      <button>
        <Image
          className={imgRotation}
          src={forward_button}
          alt="Forward button"
        />
      </button>
      <div className="h-[75px] w-[40px]"></div>
    </div>
  );
}

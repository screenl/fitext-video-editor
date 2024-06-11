export default function LoopButton(isLooping: boolean, setLoop: (arg0: boolean) => void){

  return (
    <div>
        {(
            <button
                className="w-50 btn btn-success m-5"
                onClick={()=>{setLoop(!isLooping)}}
            >
                Loop Mode {isLooping? "On": "Off"}
                {/*<img src="/assets/button.png" alt="Upload Video Button" />*/}
                {/*<div style={hoverTextStyle}>Upload</div>*/}
            </button>
        )}

    </div>
);
}
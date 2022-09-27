import { useRef } from 'react';
import { usePexip } from '../../Providers/Pexip/PexipProvider';

export default function PinEntry() {
  const pinEntryRef = useRef(null);
  const { enterPin } = usePexip();

  function joinMeeting() {
    enterPin(pinEntryRef.current.value);
  }

  return (
    <div className='popupContainer popupTop'>
      <div className='popupTitle'>Security</div>
      <div className='popupSeperator'></div>
      <div className='popupInput'>
        <div className='popupInputTitle'>Enter your PIN</div>
        <div className='popupInputInput'>
          <input type='text' ref={pinEntryRef} />
        </div>
        <div className='popupInputComment'>
          Leave it blank if you don’t know
        </div>
      </div>
      <div className='buttons'>
        <div className='leftbutton'></div>
        <div className='rightbutton'>
          <button onClick={() => joinMeeting()}>Join {'>'}</button>
        </div>
      </div>
    </div>
  );
}

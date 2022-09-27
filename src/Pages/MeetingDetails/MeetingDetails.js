import { usePexip } from '../../Providers/Pexip/PexipProvider';

export default function MeetingDetails() {
  const {
    updateCurrentPage,

    participantName,
    updateName,
    meeting,
    updateMeeting,

    muteMic,
    toggleMicMute,
    muteVid,
    toggleVidMute,

    makeCall,
    disconnectCall,
  } = usePexip();

  function nextPage() {
    updateCurrentPage('IN_CALL');
    makeCall();
  }

  function previousPage() {
    updateCurrentPage('');
  }

  return (
    <div className='popupContainer'>
      <div className='popupTitle'>Meeting details</div>
      <div className='popupSeperator'></div>
      <div className='popupInput'>
        <div className='popupInputTitle'>What is your name?</div>
        <div className='popupInputInput'>
          <input
            type='text'
            value={participantName}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
      </div>

      <div className='popupInput'>
        <div className='popupInputTitle'>What is your meeting name?</div>
        <div className='popupInputInput'>
          <input
            type='text'
            value={meeting}
            onChange={(e) => updateMeeting(e.target.value)}
          />
        </div>
      </div>

      <div className='popupCheckbox' onClick={() => toggleMicMute()}>
        <div className='popupCheckboxBox'>
          <div
            className='popupCheckboxBoxChecked'
            style={{ display: muteMic ? 'block' : 'none' }}
          ></div>
        </div>
        <div className='popupCheckboxText'>Mute Microphone</div>
      </div>

      <div className='popupCheckbox' onClick={() => toggleVidMute()}>
        <div className='popupCheckboxBox'>
          <div
            className='popupCheckboxBoxChecked'
            style={{ display: muteVid ? 'block' : 'none' }}
          ></div>
        </div>
        <div className='popupCheckboxText'>Hide Video</div>
      </div>

      <div className='buttons'>
        <div className='leftbutton'>
          <button onClick={() => previousPage()}>{'<'} Back</button>
        </div>
        <div className='rightbutton'>
          <button onClick={() => nextPage()}>Next {'>'}</button>
        </div>
      </div>
    </div>
  );
}

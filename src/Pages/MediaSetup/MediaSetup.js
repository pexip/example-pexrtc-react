import { useEffect, useRef } from 'react';
import { usePexip } from '../../Providers/Pexip/PexipProvider';
import MediaSelection from '../../Components/MediaSelection/MediaSelection';

import './MediaSetup.css';

export default function MediaSetup() {
  const nearEndVideo = useRef(null);
  const { updateCurrentPage, selectedVideoDevice } = usePexip();

  function setupSelfView() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: selectedVideoDevice,
        },
      })
      .then(function success(stream) {
        nearEndVideo.current.srcObject = stream;
      });
  }

  useEffect(() => {
    setupSelfView();
  }, [selectedVideoDevice]);

  useEffect(() => {
    setupSelfView();
  }, []);

  function nextPage() {
    updateCurrentPage('MEETING_DETAILS');
  }

  return (
    <>
      <div className='popupContainer'>
        <div className='popupTitle'>Setup your media</div>
        <div className='popupSeperator'></div>
        <div className='videoPreview'>
          <video ref={nearEndVideo} autoPlay='autoplay' muted></video>
        </div>

        <MediaSelection />

        <div className='buttons'>
          <div className='leftbutton'></div>
          <div className='rightbutton'>
            <button onClick={() => nextPage()}>Next {'>'}</button>
          </div>
        </div>
      </div>
    </>
  );
}

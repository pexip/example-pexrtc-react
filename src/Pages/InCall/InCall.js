import { useEffect, useRef, useState } from 'react';
import { usePexip } from '../../Providers/Pexip/PexipProvider';
import CallSettings from '../CallSettings/CallSettings';
import DTMF from '../../Components/DTMF/DTMF';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneSlash,
  faMicrophoneSlash,
  faMicrophone,
  faVideoSlash,
  faVideo,
  faVolumeHigh,
  faVolumeMute,
  faHashtag,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';

import './InCall.css';

export default function InCall() {
  const [muteSpeaker, setSpeakerMute] = useState(false);
  const [showDTMF, setDTMF] = useState(false);

  const farEndVideo = useRef(null);
  const nearEndVideo = useRef(null);
  const localPresentationVideo = useRef(null);

  const {
    farEndStream,
    nearEndStream,
    disconnectCall,
    toggleMicMute,
    muteMic,
    toggleVidMute,
    muteVid,
    inRemotePresentation,
    presentationSource,
    toggleLocalPresentation,
    inLocalPresentation,
  } = usePexip();

  function toggleSpeakerMute() {
    farEndVideo.current.muted = !muteSpeaker;
    setSpeakerMute(!muteSpeaker);
  }

  function toggleDTMF() {
    setDTMF(!showDTMF);
  }

  useEffect(() => {
    if (farEndStream != null) {
      // Check if the source is a MediaStream type
      if (
        typeof MediaStream !== 'undefined' &&
        farEndStream instanceof MediaStream
      ) {
        // Set the sourc object to the stream source
        farEndVideo.current.srcObject = farEndStream;
      } else {
        // It's not a Media Stream so we assume it is just a regular source and apply it
        farEndVideo.current.src = farEndStream;
      }
    }
  }, [farEndStream]);

  useEffect(() => {
    if (nearEndStream != null) {
      // Check if the source is a MediaStream type
      if (
        typeof MediaStream !== 'undefined' &&
        nearEndStream instanceof MediaStream
      ) {
        // Set the sourc object to the stream source
        nearEndVideo.current.srcObject = nearEndStream;
      } else {
        // It's not a Media Stream so we assume it is just a regular source and apply it
        nearEndVideo.current.src = nearEndStream;
      }
    }
  }, [nearEndStream]);

  useEffect(() => {
    if (inLocalPresentation) {
      if (
        typeof MediaStream !== 'undefined' &&
        presentationSource instanceof MediaStream
      ) {
        // Set the source object to the stream source
        localPresentationVideo.current.srcObject = presentationSource;
      } else {
        // It's not a Media Stream so we assume it is just a regular source and apply it
        localPresentationVideo.current.src = presentationSource;
      }
    }
  }, [inLocalPresentation]);

  return (
    <>
      <CallSettings />
      <div className='inCallContainer'>
        <div
          className={`videoContainer ${
            inRemotePresentation || inLocalPresentation ? 'inPresentation' : ''
          }`}
        >
          <video ref={farEndVideo} autoPlay='autoplay'></video>
        </div>
        <div
          className='presentationWindow'
          style={{
            display:
              inRemotePresentation || inLocalPresentation ? 'flex' : 'none',
          }}
        >
          {inLocalPresentation ? (
            <video
              ref={localPresentationVideo}
              muted
              autoPlay='autoplay'
            ></video>
          ) : (
            <img src={presentationSource} alt='' />
          )}
        </div>
        <div className='callControlsContainer'>
          <div className='callControls'>
            <div className='callControl' onClick={() => toggleMicMute()}>
              <FontAwesomeIcon
                icon={muteMic ? faMicrophoneSlash : faMicrophone}
              />
            </div>
            <div className='callControl' onClick={() => toggleVidMute()}>
              <FontAwesomeIcon icon={muteVid ? faVideoSlash : faVideo} />
            </div>
            <div
              className='callControl'
              onClick={() => toggleLocalPresentation()}
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </div>
            <div className='callControl' onClick={() => toggleDTMF()}>
              <FontAwesomeIcon icon={faHashtag} />
              {showDTMF ? <DTMF /> : ''}
            </div>
            <div className='callControl' onClick={() => toggleSpeakerMute()}>
              <FontAwesomeIcon
                icon={muteSpeaker ? faVolumeMute : faVolumeHigh}
              />
            </div>
            <div
              className='callControl disconnectCall'
              onClick={() => disconnectCall()}
            >
              <FontAwesomeIcon icon={faPhoneSlash} />
            </div>
          </div>
        </div>
        <div className='nearEndVideoContainer'>
          <video ref={nearEndVideo} autoPlay='autoplay' muted></video>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState, useRef } from 'react';
import { usePexip } from '../../Providers/Pexip/PexipProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faChevronUp,
  faChevronDown,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';

import './MediaSetup.css';

export default function MediaSetup() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedAudioDeviceLabel, setSelectedAudioDeviceLabel] = useState([]);
  const [selectedVideoDeviceLabel, setSelectedVideoDeviceLabel] = useState([]);
  const nearEndVideo = useRef(null);
  const {
    updateCurrentPage,
    selectAudioDevice,
    selectedAudioDevice,
    selectVideoDevice,
    selectedVideoDevice,
  } = usePexip();

  useEffect(() => {
    // Set the constraints of the video to search for
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    let constraints = {
      video: {
        height: {
          min: 128,
        },
        width: {
          min: 128,
        },
      },
      audio: true,
    };

    // An async function to get the video and audio devices
    async function getMediaDevices(constraints) {
      // Request permission to list devices
      await navigator.mediaDevices.getUserMedia(constraints);
      // Enumerate the devices
      let devices = await navigator.mediaDevices.enumerateDevices();

      // Filter only video devices
      setVideoDevices(devices.filter((d) => d.kind === 'videoinput'));
      // Filter only audio devices
      setAudioDevices(devices.filter((d) => d.kind === 'audioinput'));

      console.log(
        'HERE2',
        devices.filter((d) => d.kind === 'videoinput')
      );
    }

    // Run the async function
    getMediaDevices(constraints);
  }, []);

  useEffect(() => {
    if (videoDevices.length > 0) {
      setSelectedVideoDeviceLabel(
        selectedVideoDevice
          ? videoDevices.filter((d) => d.deviceId === selectedVideoDevice)[0]
              .label
          : videoDevices[0].label
      );

      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: selectedVideoDevice
              ? selectedVideoDevice
              : videoDevices[0].deviceId,
          },
        })
        .then(function success(stream) {
          nearEndVideo.current.srcObject = stream;
        });
    }
  }, [videoDevices, selectedVideoDevice]);

  useEffect(() => {
    if (audioDevices.length > 0) {
      setSelectedAudioDeviceLabel(
        selectedAudioDevice
          ? audioDevices.filter((d) => d.deviceId === selectedAudioDevice)[0]
              .label
          : audioDevices[0].label
      );
    }
  }, [audioDevices, selectedAudioDevice]);

  function toggleVideo() {
    setAudioOpen(false);
    setVideoOpen(!videoOpen);
  }

  function toggleAudio() {
    setVideoOpen(false);
    setAudioOpen(!audioOpen);
  }

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
        <div className='mediaSelection'>
          <div
            className='mediaItem mediaTop'
            onClick={() => {
              toggleVideo();
            }}
          >
            <div className='mediaIcon'>
              <FontAwesomeIcon icon={faVideo} />
            </div>
            <div className='mediaName'>{selectedVideoDeviceLabel}</div>
            <div className='mediaCaret'>
              {videoOpen ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </div>
          </div>

          {videoDevices.map((device) => {
            return (
              <div
                className='mediaSubItem'
                style={{ display: videoOpen ? 'block' : 'none' }}
                key={device.deviceId}
                onClick={() => selectVideoDevice(device.deviceId)}
              >
                <div className='mediaName'>{device.label}</div>
              </div>
            );
          })}

          <div
            className='mediaItem mediaBottom'
            onClick={() => {
              toggleAudio();
            }}
          >
            <div className='mediaIcon'>
              <FontAwesomeIcon icon={faMicrophone} />
            </div>
            <div className='mediaName'>{selectedAudioDeviceLabel}</div>
            <div className='mediaCaret'>
              {audioOpen ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </div>
          </div>

          {audioDevices.map((device) => {
            return (
              <div
                className='mediaSubItem'
                style={{ display: audioOpen ? 'block' : 'none' }}
                key={device.deviceId}
                onClick={() => selectAudioDevice(device.deviceId)}
              >
                <div className='mediaName'>{device.label}</div>
              </div>
            );
          })}
        </div>

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

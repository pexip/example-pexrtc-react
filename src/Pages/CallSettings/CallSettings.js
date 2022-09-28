import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faVideo,
  faChevronUp,
  faChevronDown,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { usePexip } from '../../Providers/Pexip/PexipProvider';

import './CallSettings.css';

export default function CallSettings() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedAudioDeviceLabel, setSelectedAudioDeviceLabel] = useState([]);
  const [selectedVideoDeviceLabel, setSelectedVideoDeviceLabel] = useState([]);
  const [callSettingsOpen, setCallSettingsOpen] = useState(false);

  const {
    updateCurrentPage,
    selectAudioDevice,
    selectedAudioDevice,
    selectVideoDevice,
    selectedVideoDevice,
  } = usePexip();

  function toggleCallSettings() {
    setCallSettingsOpen(!callSettingsOpen);
  }

  function closeCallSettings() {
    setCallSettingsOpen(false);
  }

  function toggleVideo() {
    setAudioOpen(false);
    setVideoOpen(!videoOpen);
  }

  function toggleAudio() {
    setVideoOpen(false);
    setAudioOpen(!audioOpen);
  }

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

  return (
    <>
      <div className='callSettingsButton' onClick={() => toggleCallSettings()}>
        <FontAwesomeIcon icon={faGear} />
      </div>
      <div
        className='popupBackdrop'
        style={{ display: callSettingsOpen ? 'block' : 'none' }}
      ></div>
      <div
        className='popupContainer popupTop'
        style={{ display: callSettingsOpen ? 'block' : 'none' }}
      >
        <div className='popupTitle'>Call settings</div>
        <div className='popupSeperator'></div>
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
            <button onClick={() => closeCallSettings()}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

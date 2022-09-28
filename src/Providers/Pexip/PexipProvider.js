import React, { createContext, useReducer, useContext, useEffect } from 'react';
import pexipReducer, { initialState } from './pexipReducer';

const PexipContext = createContext(initialState);

export const pexRTC = new window['PexRTC']();

export const usePexip = () => {
  const context = useContext(PexipContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within PexipContext');
  }

  return context;
};

export default function PexipProvider({ children }) {
  const [state, dispatch] = useReducer(pexipReducer, initialState);

  function updateCurrentPage(page) {
    dispatch({
      type: 'UPDATE_CURRENT_PAGE',
      payload: {
        currentPage: page,
      },
    });
  }

  function updateName(participantName) {
    dispatch({
      type: 'UPDATE_NAME',
      payload: {
        participantName: participantName,
      },
    });
  }

  function updateMeeting(meeting) {
    dispatch({
      type: 'UPDATE_MEETING',
      payload: {
        meeting: meeting,
      },
    });
  }

  function toggleMicMute() {
    pexRTC.muteAudio(!state.muteMic);

    dispatch({
      type: 'UPDATE_MIC_MUTE',
      payload: {
        muteMic: !state.muteMic,
      },
    });
  }

  function toggleVidMute() {
    pexRTC.muteVideo(!state.muteVid);

    dispatch({
      type: 'UPDATE_VID_MUTE',
      payload: {
        muteVid: !state.muteVid,
      },
    });
  }

  function updatePinState(pinState) {
    dispatch({
      type: 'UPDATE_PIN_STATE',
      payload: {
        pinState: pinState,
      },
    });
  }

  function updateCallState(callState) {
    dispatch({
      type: 'UPDATE_CALL_STATE',
      payload: {
        callState: callState,
      },
    });
  }

  function updateFarEndStream(stream) {
    dispatch({
      type: 'UPDATE_FAR_END_STREAM',
      payload: {
        farEndStream: stream,
      },
    });
  }

  function updateNearEndStream(stream) {
    dispatch({
      type: 'UPDATE_NEAR_END_STREAM',
      payload: {
        nearEndStream: stream,
      },
    });
  }

  function selectAudioDevice(deviceId) {
    dispatch({
      type: 'SELECT_AUDIO_DEVICE',
      payload: {
        selectedAudioDevice: deviceId,
      },
    });
  }

  function selectVideoDevice(deviceId) {
    dispatch({
      type: 'SELECT_VIDEO_DEVICE',
      payload: {
        selectedVideoDevice: deviceId,
      },
    });
  }

  function updateInPresentation(inPresentation) {
    dispatch({
      type: 'UPDATE_IN_PRESENTATION',
      payload: {
        inPresentation: inPresentation,
      },
    });
  }

  function updatePresentationURL(presentationURL) {
    dispatch({
      type: 'UPDATE_PRESENTATION_URL',
      payload: {
        presentationURL: presentationURL,
      },
    });
  }

  function makeCall() {
    pexRTC.vp8_enabled = false;
    pexRTC.vp9_enabled = false;

    pexRTC.muteAudio(state.muteMic);
    pexRTC.muteVideo(state.muteVid);

    pexRTC.video_source = state.selectedVideoDevice;
    pexRTC.audio_source = state.selectedAudioDevice;

    pexRTC.makeCall('au.pexipdemo.com', state.meeting, state.participantName);
  }

  function enterPin(pin) {
    pexRTC.connect(pin);
    updatePinState('');
  }

  function disconnectCall() {
    pexRTC.disconnect();
    pexRTC.pin = null;
    updatePinState('');
    updateCurrentPage('');
    updateInPresentation(false);
  }

  const value = {
    currentPage: state.currentPage,
    participantName: state.participantName,
    meeting: state.meeting,
    muteMic: state.muteMic,
    muteVid: state.muteVid,
    pinState: state.pinState,
    callState: state.callState,
    inPresentation: state.inPresentation,
    presentationURL: state.presentationURL,

    farEndStream: state.farEndStream,
    nearEndStream: state.nearEndStream,
    selectedAudioDevice: state.selectedAudioDevice,
    selectedVideoDevice: state.selectedVideoDevice,

    updateCurrentPage,
    updateName,
    updateMeeting,
    toggleMicMute,
    toggleVidMute,
    selectAudioDevice,
    selectVideoDevice,

    makeCall,
    enterPin,
    disconnectCall,
  };

  useEffect(() => {
    function callSetup(stream, pinStatus) {
      switch (pinStatus) {
        case 'required':
        case 'optional':
          updatePinState(pinStatus);
          break;
        default:
          updatePinState('');
          pexRTC.connect();
      }

      updateNearEndStream(stream);
      updateCallState(true);
    }

    function callConnected(stream) {
      updateFarEndStream(stream);
      updateCallState(true);
    }

    function callDisconnected(reason = '') {
      pexRTC.pin = null;
      updateCallState(false);
      updatePinState('');
      updateCurrentPage('');
      updateInPresentation(false);
    }

    function callError(error) {
      pexRTC.pin = null;
      updateCallState(false);
      updatePinState('');
      updateCurrentPage('MEETING_DETAILS');
      updateInPresentation(false);

      alert(error);
    }

    function callPresentation(setting, presenter, uuid) {
      updatePresentationURL('');
      updateInPresentation(setting);
    }

    function callPresentationReload(url) {
      updatePresentationURL(url);
    }

    // Link the callSetup method to the onSetup callback
    pexRTC.onSetup = callSetup;
    // Link the callConnected method to the onConnect callback
    pexRTC.onConnect = callConnected;
    // Link the callError method to the onError callback
    pexRTC.onError = callError;
    // Link the callDisconnected method to the onDisconnect callback
    pexRTC.onDisconnect = callDisconnected;

    pexRTC.onPresentation = callPresentation;
    pexRTC.onPresentationReload = callPresentationReload;
  }, []);

  return (
    <PexipContext.Provider value={value}>{children}</PexipContext.Provider>
  );
}

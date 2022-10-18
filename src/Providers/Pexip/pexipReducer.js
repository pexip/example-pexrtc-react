const storedState = JSON.parse(localStorage.getItem('state')) || {};

export const initialState = {
  currentPage: '',
  participantName: storedState.participantName || '',
  meeting: storedState.meeting || '',
  muteMic: storedState.muteMic || false,
  muteVid: storedState.muteVid || false,
  pinState: '',
  pin: '',
  callState: false,
  selectedAudioDevice: storedState.selectedAudioDevice || '',
  selectedVideoDevice: storedState.selectedVideoDevice || '',
};

export default function pexipReducer(state, action) {
  const { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case 'UPDATE_CURRENT_PAGE':
      newState.currentPage = payload.currentPage;
      break;
    case 'UPDATE_NAME':
      newState.participantName = payload.participantName;
      break;
    case 'UPDATE_MEETING':
      newState.meeting = payload.meeting;
      break;
    case 'UPDATE_MIC_MUTE':
      newState.muteMic = payload.muteMic;
      break;
    case 'UPDATE_VID_MUTE':
      newState.muteVid = payload.muteVid;
      break;
    case 'UPDATE_PIN_STATE':
      newState.pinState = payload.pinState;
      break;
    case 'UPDATE_PIN':
      newState.pin = payload.pin;
      break;
    case 'UPDATE_CALL_STATE':
      newState.callState = payload.callState;
      break;
    case 'UPDATE_FAR_END_STREAM':
      newState.farEndStream = payload.farEndStream;
      break;
    case 'UPDATE_NEAR_END_STREAM':
      newState.nearEndStream = payload.nearEndStream;
      break;
    case 'SELECT_AUDIO_DEVICE':
      newState.selectedAudioDevice = payload.selectedAudioDevice;
      break;
    case 'SELECT_VIDEO_DEVICE':
      newState.selectedVideoDevice = payload.selectedVideoDevice;
      break;
    case 'UPDATE_IN_PRESENTATION':
      newState.inRemotePresentation = payload.inRemotePresentation;
      break;
    case 'UPDATE_PRESENTATION_SOURCE':
      newState.presentationSource = payload.presentationSource;
      break;
    case 'UPDATE_PRESENTING_LOCALLY':
      newState.inLocalPresentation = payload.inLocalPresentation;
      break;
    default:
      throw new Error(`No case for type ${type} found in pexipReducer.`);
  }

  localStorage.setItem('state', JSON.stringify(newState));
  return newState;
}

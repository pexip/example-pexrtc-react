import { useState } from 'react';
import MediaSelection from '../../Components/MediaSelection/MediaSelection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import './CallSettings.css';

export default function CallSettings() {
  const [callSettingsOpen, setCallSettingsOpen] = useState(false);

  function toggleCallSettings() {
    setCallSettingsOpen(!callSettingsOpen);
  }

  function closeCallSettings() {
    setCallSettingsOpen(false);
  }

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

        <MediaSelection />

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

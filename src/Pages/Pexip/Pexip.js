import MediaSetup from '../MediaSetup/MediaSetup';
import MeetingDetails from '../MeetingDetails/MeetingDetails';
import InCall from '../InCall/InCall';
import PinEntry from '../PinEntry/PinEntry';

import { usePexip } from '../../Providers/Pexip/PexipProvider';

import '@fontsource/inter';
import './Pexip.css';

function OutsideCall() {
  const { currentPage, pinState, callState } = usePexip();

  return (
    <div className='pageContainer'>
      {(() => {
        switch (currentPage) {
          case 'MEETING_DETAILS':
            return <MeetingDetails />;
          case 'IN_CALL' /* && callState === true*/:
            return <InCall />;
          default:
            return <MediaSetup />;
        }
      })()}

      {(() => {
        if (pinState !== '' && callState === true) {
          return <PinEntry />;
        }
      })()}
    </div>
  );
}

export default OutsideCall;

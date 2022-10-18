import { usePexip } from '../../Providers/Pexip/PexipProvider';

import './DTMF.css';

export default function DTMF() {
  const { sendDTMF } = usePexip();

  return (
    <div className='dtmfContainer' onClick={(e) => e.stopPropagation()}>
      <div className='dtmfBackground'>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('1')}>1</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('2')}>2</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('3')}>3</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('4')}>4</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('5')}>5</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('6')}>6</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('7')}>7</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('8')}>8</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('9')}>9</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('*')}>*</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('0')}>0</button>
        </div>
        <div className='dtmfButton'>
          <button onClick={() => sendDTMF('#')}>#</button>
        </div>
      </div>
      <div className='dtmfTail'></div>
    </div>
  );
}

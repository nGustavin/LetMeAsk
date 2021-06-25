import React from 'react';
import copyImg from '../Assets/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

const RoomCode: React.FC <RoomCodeProps> = ({code}: RoomCodeProps) => {

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}

export default RoomCode;
import React, { useState } from 'react';
import Board from './Board';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import './Chat.css';
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: 'none', state: 'none' });
  channel.on('user.watching.start', (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div> Waiting for other player to join ..</div>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          hideDeletedMessages
          closeReactionSelectorOnClick
          messageActions={['react']}
        />
        <MessageInput noFiles />
      </Window>{' '}
      <button
        className="btn"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        Leave Game
      </button>
      {result.state === 'Won' && <div> {result.winner} Won The Game</div>}
      {result.state === 'Tie' && <div> Game Tieds</div>}
    </div>
  );
}

export default Game;

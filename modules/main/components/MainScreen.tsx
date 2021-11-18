import React, { ChangeEvent, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

type InputStates = 'text' | 'input';

const inputSate = {
  text: 'text',
  input: 'input',
};

const MainScreen = () => {
  const [player, setPlayer] = useState<any>();

  const ref = (playerParam: any) => {
    setPlayer(playerParam);
    // console.log('player', player);
  };

  const handleGetTime = () => {
    console.log('player.getCurrentTime()', player.getCurrentTime());
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleTransform = (id) => {
    setText({
      ...text,
      state: inputSate.input,
    });

    setRows([
      ...rows.map((row) => ({
        ...row,
        state: row.id === id ? inputSate.input : inputSate.text,
      })),
    ]);

    setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>, id) => {
    setRows(
      rows.map((row) => {
        return row.id === id ? { ...row, value: e.target.value } : { ...row };
      }),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log('e', e);
    if (e.key === 'Enter' && e.shiftKey === false) {
      console.log('enter');
      // setText({ ...text, state: inputSate.text });

      setRows([
        ...rows.map((row) => ({ ...row, state: inputSate.text })),
        { value: '', id: rows.length + 1, state: inputSate.input },
      ]);
      // setTimeout(() => {
      //   inputRef?.current?.focus();
      // }, 100);
    }
  };

  const [rows, setRows] = useState([
    {
      id: 0,
      value: '',
      state: inputSate.input,
    },
  ]);

  const [text, setText] = useState({
    data: 'hi',
    state: inputSate.text,
  });

  return (
    <div className="container">
      <h1>Screen</h1>

      <div className="grid grid-cols-2">
        <div>
          <ReactPlayer
            ref={ref}
            url="https://www.youtube.com/watch?v=6u-KAF5B9hc"
            muted={true}
            playing={true}
            onStart={() => console.log('onStart')}
            onPlay={() => console.log('onPlay')}
            onPause={() => console.log('onPause')}
            controls={true}
          />
        </div>
        <div>
          <div className="w-full">
            {rows.map((row, idx) => (
              <div key={row.id} className="w-full">
                {row.state === inputSate.text ? (
                  <div
                    onClick={() => handleTransform(row.id)}
                    className="whitespace-pre-wrap break-words"
                  >
                    {row.value || 'Empieza a escribir'}
                  </div>
                ) : (
                  <textarea
                    className="w-full"
                    name="text"
                    autoFocus
                    id={'input-' + row.id}
                    value={`${row.value}`}
                    onChange={(e) => handleInputChange(e, row.id)}
                    onKeyPress={handleKeyPress}
                  />
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={handleGetTime}>
            Get time stamp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

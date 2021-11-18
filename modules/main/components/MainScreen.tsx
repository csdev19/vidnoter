import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import ReactPlayer from 'react-player';

const MainScreen = () => {
  const [player, setPlayer] = useState<any>();

  const ref = (playerParam: any) => {
    setPlayer(playerParam);
    // console.log('player', player);
  };

  const handleGetTime = () => {
    console.log('player.getCurrentTime()', player.getCurrentTime());
  };

  // const editableRef = useRef<HTMLDivElement>(null);
  const editableRefs = useRef<Array<HTMLDivElement>>([]);

  const addItemToArray = (array, item, position) => {
    const newArray = [...array];
    newArray.splice(position, 0, item);
    return [...newArray];
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>, id) => {
    console.log('ekey pres', e);
    if (e.key === 'Enter' && e.shiftKey === false) {
      const row = rows.find((row) => row.id === id);

      const indexRow = rows.indexOf(row);

      const newRows = addItemToArray(
        rows,
        { value: '', id: indexRow + 1 },
        indexRow,
      );
      setRows([...newRows.map((row, idx) => ({ ...row, id: idx }))]);

      setTimeout(() => {
        // (editableRefs).forEach((editable, idx) => {
        //   editable?.current?.focus();
        // }
        console.log('editableRefs', editableRefs);
        editableRefs?.current[indexRow + 1]?.focus();
      }, 10);
    } else if (e.code === 'Backspace') {
      setRows((prevRows) => {
        return [
          ...rows.filter((row) => {
            return row.id == id
              ? (e.target as HTMLElement).innerText !== ''
              : true; // & prevRows[idx] ? row.value !== '' : true;
          }),
        ];
      });
      setTimeout(() => {
        editableRefs[id]?.current?.focus();
      }, 100);
    } else {
      setRows(
        rows.map((row) => {
          return row.id === id
            ? { ...row, value: (e.target as HTMLElement).innerText }
            : { ...row };
        }),
      );

      // editableRef?.current?.focus();
      // setTimeout(() => {
      //   editableRef?.current?.focus();
      // }, 100);
    }
  };

  const [rows, setRows] = useState([
    {
      id: 0,
      value: '',
    },
  ]);

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
          <div className="w-full p-4">
            {rows.map((row, idx) => (
              <div key={row.id} className="w-full">
                <div
                  className="w-full whitespace-pre-wrap break-words"
                  contentEditable="true"
                  id={'input-' + row.id}
                  // onChange={(e) => handleInputChange(e, row.id)}
                  onKeyDown={(e) => handleKeyPress(e, row.id)}
                  suppressContentEditableWarning={true}
                  ref={(element) => (editableRefs.current[idx] = element)}
                  placeholder="Enter text"
                  data-ph="My Placeholder String"
                ></div>
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

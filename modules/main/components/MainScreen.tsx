import clsx from 'clsx';
import EditableText from 'components/EditableText';
import React, {
  useEffect,
  useRef,
  useState,
  VoidFunctionComponent,
} from 'react';
import ReactPlayer from 'react-player';

const MainScreen: VoidFunctionComponent = () => {
  const [player, setPlayer] = useState<ReactPlayer>();

  const ref = (playerParam) => {
    setPlayer(playerParam);
  };

  const handleGetTime = () => {
    console.log('player.getCurrentTime()', player.getCurrentTime());
    console.log('rows', rows);
  };

  // const editableRef = useRef<HTMLDivElement>(null);
  const editableRefs = useRef<Array<HTMLDivElement>>([]);

  const addItemToArray = (array, item, position) => {
    const newArray = [...array];
    newArray.splice(position, 0, item);
    return [...newArray];
  };

  const [prevKey, setPrevKey] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, id) => {
    const row = rows.find((row) => row.id === id);
    const indexRow = rows.indexOf(row);

    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const testRange = range.cloneRange();

    const element = e.target as Node;
    testRange.selectNodeContents(element);
    testRange.setEnd(range.startContainer, range.startOffset);

    const firstPart = testRange.toString().split('\n');

    testRange.selectNodeContents(element);
    testRange.setStart(range.endContainer, range.endOffset);

    const lastPart = testRange.toString().split('\n');

    const isFirstLine = firstPart.length === 1 && firstPart[0] === '';
    const isLastLine = lastPart.length === 1 && lastPart[0] === '';

    if (e.key === 'Enter' && e.shiftKey === false) {
      const newRows = addItemToArray(
        [...rows],
        { value: '', id: indexRow + 1 },
        indexRow + 1,
      ).map((row, idx) => ({ ...row, id: idx }));

      setRows([...newRows]);

      setTimeout(() => {
        editableRefs?.current[indexRow + 1]?.focus();
        console.log('rows', rows);
      }, 10);
    } else if (prevKey == e.code && e.code === 'Backspace') {
      setRows([
        ...rows.filter((row) => {
          return row.id == id
            ? (e.target as HTMLDivElement).innerText.trim() !== ''
            : true;
        }),
      ]);
      setTimeout(() => {
        editableRefs[id]?.current?.focus();
      }, 100);
    } else if (prevKey == e.code && e.code === 'ArrowDown' && isLastLine) {
      setTimeout(() => {
        editableRefs?.current[indexRow + 1]?.focus();
      }, 10);
    } else if (prevKey == e.code && e.code === 'ArrowUp' && isFirstLine) {
      setTimeout(() => {
        editableRefs?.current[indexRow - 1]?.focus();
      }, 10);
    } else {
      console.log(
        'e.target as HTMLDivElement).innerText',
        (e.target as HTMLDivElement).innerText,
      );
      setRows(
        rows.map((row) => {
          return row.id === id
            ? { ...row, value: (e.target as HTMLDivElement).innerText }
            : { ...row };
        }),
      );

      // editableRef?.current?.focus();
      setTimeout(() => {
        editableRefs?.current[indexRow]?.focus();
      }, 100);
    }

    setPrevKey(e.key);
    console.log('rows', rows);
  };

  const [rows, setRows] = useState([
    {
      id: 0,
      value: '',
    },
  ]);

  // useEffect(() => {
  //   editableRefs.current = [];
  // }, [rows]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full overflow-auto">
          <ReactPlayer
            ref={ref}
            url="https://www.youtube.com/watch?v=6u-KAF5B9hc"
            muted={true}
            playing={true}
            onStart={() => console.log('onStart')}
            onPlay={() => console.log('onPlay')}
            onPause={() => console.log('onPause')}
            controls={true}
            width="640px"
            height="360px"
          />
        </div>
        <div className="w-full">
          <div className="w-full p-4 h-80 overflow-y-auto">
            {rows.map((row, idx) => (
              <div key={row.id} className="w-full">
                <EditableText
                  id={'input-' + row.id}
                  handleKeyUp={(e) => handleKeyPress(e, row.id)}
                  handleRef={(element) => (editableRefs.current[idx] = element)}
                  placeholder={'Enter text'}
                ></EditableText>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleGetTime}>
            Get time stamp
          </button>
        </div>
      </div>
    </>
  );
};

export default MainScreen;

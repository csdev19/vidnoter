import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

type EditableTextProps = {
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRef: (ref: HTMLInputElement) => void;
  id: string;
  placeholder: string;
  children?: React.ReactNode;
};

const EditableText: FunctionComponent<EditableTextProps> = ({
  id,
  placeholder,
  handleKeyUp,
  handleRef,
  children = '',
}) => {
  return (
    <div
      className={clsx('w-full', 'whitespace-pre-wrap', 'break-words', 'p-2')}
      contentEditable="true"
      id={id}
      onKeyUp={handleKeyUp}
      suppressContentEditableWarning={true}
      ref={handleRef}
      data-ph={placeholder}
    >
      {children}
    </div>
  );
};

export default EditableText;

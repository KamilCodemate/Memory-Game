import React, { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';
import { MdOutlineContentCopy } from 'react-icons/md';
const buttonRef = React.createRef();

type Props = {
  text: string | null;
};
const CopyToClipboard: React.FC<Props> = ({ text }): React.ReactElement => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const clipboard = new ClipboardJS(buttonRef.current as any, {
      text: () => text as any,
    });
    return () => {
      clipboard.destroy();
    };
  }, [text]);

  return (
    <div ref={buttonRef as any}>
      <MdOutlineContentCopy size={40} id={'clipCode'} />
    </div>
  );
};
export default CopyToClipboard;

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import PreviewLoading from './PreviewLoading';
import { useEffect, useState } from 'react';
import { Resizable } from 're-resizable';
import { useAppContext } from '../../contexts/AppContext';
import Console from './Console';

const defaultEnable = {
  top: false,
  left: false,
  right: false,
  bottom: false,
  topLeft: false,
  topRight: false,
  bottomLeft: false,
  bottomRight: false
};

const CodeShell = () => {
  const [useConsole, setUseConsole] = useState(false);

  return (
    <>
      <div className="flex h-[80vh] w-full">
        <Resizable
          enable={{ ...defaultEnable, right: true }}
          minWidth="30%"
          maxWidth="70%"
          defaultSize={{ width: '50%', height: '100%' }}
          handleClasses={{ right: '' }}
        >
          <CodeEditor />
        </Resizable>

        <div className="flex-1 bg-white relative">
          <div className="flex absolute left-0 top-0 -translate-y-full text-white">
            <button
              className="px-2 py-1 border border-gray-900 bg-gray-700"
              onClick={() => setUseConsole(false)}
            >
              Preview
            </button>
            <button
              className="px-2 py-1 border border-gray-900 bg-gray-700"
              onClick={() => setUseConsole(true)}
            >
              Console
            </button>
          </div>

          <div className="w-full h-full">
            <div
              className={`absolute left-0 top-0 w-full h-full ${
                useConsole && 'invisible'
              }`}
            >
              <Preview />
            </div>
            <div
              className={`absolute left-0 top-0 w-full h-full ${
                !useConsole && 'invisible'
              }`}
            >
              <Console />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeShell;

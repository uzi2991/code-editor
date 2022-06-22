import CodeEditor from './CodeEditor';
import Preview from './Preview';
import PreviewLoading from './PreviewLoading';
import { useEffect, useState } from 'react';
import { Resizable } from 're-resizable';
import { useAppContext } from '../../contexts/AppContext';
import Console from './Console';
import styles from './CodeShell.module.css';

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
  const { bundle } = useAppContext();

  return (
    <>
      <div className="flex h-[80vh] w-full bg-gray-700">
        <Resizable
          enable={{ ...defaultEnable, right: true }}
          minWidth="30%"
          maxWidth="70%"
          defaultSize={{ width: '50%', height: '100%' }}
          handleClasses={{ right: '' }}
          className="flex flex-col"
        >
          <CodeEditor />
        </Resizable>

        <div className="flex-1 flex flex-col">
          <div className="flex text-white justify-end">
            <button
              className={`${styles.tab} ${!useConsole && styles.active}`}
              onClick={() => setUseConsole(false)}
            >
              Preview
            </button>
            <button
              className={`${styles.tab} ${useConsole && styles.active}`}
              onClick={() => setUseConsole(true)}
            >
              Console
            </button>
          </div>

          <div className="relative flex-1">
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

            {bundle.err && (
              <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                <div className='text-red-600 text-xl shadow-md bg-orange-100 px-4 py-2'>{bundle.err}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeShell;

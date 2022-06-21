import MonacoEditor from '@monaco-editor/react';
import { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const CodeEditor = () => {
  const { currentLanguage, setCode, code } = useAppContext();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, [currentLanguage]);

  return (
    <div className="h-full w-full">
      <MonacoEditor
        path={currentLanguage}
        defaultLanguage={currentLanguage}
        defaultValue={code[currentLanguage]}
        onChange={(value) => setCode(currentLanguage, value || '')}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          fontFamily: 'Fira Code',
          fontLigatures: true
        }}
      />
    </div>
  );
};

export default CodeEditor;

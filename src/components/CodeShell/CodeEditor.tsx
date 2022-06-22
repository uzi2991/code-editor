import MonacoEditor from '@monaco-editor/react';
import { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import prettier from 'prettier';
import jsParser from 'prettier/parser-babel';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';

const parserMap = {
  css: 'css',
  html: 'html',
  javascript: 'babel'
};

const CodeEditor = () => {
  const { currentLanguage, setCode, code } = useAppContext();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, [currentLanguage]);

  const onFormatClick = () => {
    console.log('format');
    const formatted = prettier
      .format(code[currentLanguage], {
        parser: parserMap[currentLanguage],
        plugins: [jsParser, htmlParser, cssParser],
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'none'
      })
      .replace(/\n$/, '');

    setCode(currentLanguage, formatted);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(code[currentLanguage]);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-end">
        <button
          className="px-2 py-1 text-white active:bg-gray-700 hover:bg-gray-900"
          onClick={onFormatClick}
        >
          Format
        </button>
        <button
          className="px-2 py-1 text-white active:bg-gray-700 hover:bg-gray-900"
          onClick={onCopyClick}
        >
          Copy
        </button>
      </div>
      <MonacoEditor
        className="flex-1"
        path={currentLanguage}
        language={currentLanguage}
        value={code[currentLanguage]}
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

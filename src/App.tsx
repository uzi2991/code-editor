import CodeShell from './components/CodeShell/CodeShell';
import Sidebar from './components/Sidebar/Sidebar';
import { useEffect } from 'react';
import { useMonaco } from '@monaco-editor/react';
import axios from 'axios';
import Console from './components/CodeShell/Console';

const App = () => {
  const monaco = useMonaco();

  useEffect(() => {
    axios.get('themes/dracula.json').then(({ data }) => {
      monaco?.editor.defineTheme('dracula', data);
      monaco?.editor.setTheme('dracula');
    });
  }, [monaco]);

  return (
    <>
      <div className="w-full flex py-16 px-16">
        <Sidebar />
        <CodeShell />
      </div>
    </>
  );
};

export default App;

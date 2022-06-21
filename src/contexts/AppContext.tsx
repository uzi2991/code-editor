import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react';
import { esbuildBundle } from '../bundler/index';

export type Language = 'html' | 'css' | 'javascript';

export type Bundle = {
  code: string;
  err: string;
  loading: boolean;
};

export type Log = {
  type: 'log' | 'error' | 'warn';
  content: string;
};

type AppContextType = {
  code: { [key in Language]: string };
  setCode: (language: Language, value: string) => void;
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  bundle: Bundle;
  logs: Log[];
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [code, _setCode] = useState<{ [key in Language]: string }>({
    html: '',
    css: '',
    javascript: ''
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>('html');

  const [bundle, setBundle] = useState<Bundle>({
    code: '',
    err: '',
    loading: false
  });

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBundle({
        ...bundle,
        loading: true
      });

      esbuildBundle(code['javascript']).then((result) => {
        setBundle({ ...result, loading: false });
      });
    }, 750);

    return () => clearTimeout(timer);
  }, [code['javascript']]);

  useEffect(() => {
    console.log('Logs changed');
    console.log(logs);
  }, [logs]);

  useEffect(() => {
    const listener = ({ data }: MessageEvent) => {
      if (data.from === 'iframe') {
        setLogs(data.logs);
      }
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, []);

  const setCode = (language: Language, value: string) => {
    _setCode({ ...code, [language]: value });
  };

  return (
    <AppContext.Provider
      value={{
        logs,
        code,
        setCode,
        currentLanguage,
        bundle,
        setCurrentLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

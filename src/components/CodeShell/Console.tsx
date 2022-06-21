import { useAppContext } from '../../contexts/AppContext';

const Console = () => {
  const { logs } = useAppContext();

  return (
    <div className="bg-gray-700 text-white font-code w-full h-full overflow-y-auto">
      {logs.map((log, index) => (
        <div key={index} className="whitespace-pre-wrap border-b border-b-gray-500 px-2 py-1">
          {log.content}
        </div>
      ))}
    </div>
  );
};

export default Console;

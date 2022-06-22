import { useAppContext, Log } from '../../contexts/AppContext';

const Console = () => {
  const { logs } = useAppContext();

  const renderLog = (log: Log) => {
    if (log.type === "error") {
      return <h1 className='text-red-600'>{log.content}</h1>
    } else {
      return <h1 className='text-white'>{log.content}</h1>
    }
  }

  return (
    <div className="bg-gray-700 font-code w-full h-full overflow-y-auto">
      {logs.map((log, index) => (
        <div key={index} className="whitespace-pre-wrap border-b border-b-gray-500 px-2 py-1">
          {renderLog(log)}
        </div>
      ))}
    </div>
  );
};

export default Console;

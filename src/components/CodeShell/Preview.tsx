import { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import styles from './Preview.module.css';

const Preview = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const { code, bundle } = useAppContext();

  const html = `
    <html>
      <head>
        <style>
          ${code['css']}
        </style>
      </head>
      <body>
        <div id="root">
          ${code['html']}
        </div>
        <script>
          const methodNames = ['log', 'warn', 'error'];
          const logs = [];

          const cnsl = {};

          methodNames.forEach((methodName) => {
            cnsl[methodName] = console[methodName];
            console[methodName] = function () {
              var content = "";

              for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'object') {
                  content += JSON.stringify(arguments[i], undefined, 2) + ' ';
                } else {
                  content += arguments[i] + ' ';
                }
              }

              logs.push({type: methodName, content});

              window.top.postMessage({from: "iframe", logs}, "*");
            };
          });

          window.addEventListener('message', (event) => {
            const handleError = (err) => {
              console.error(String(err));
            }

            window.addEventListener('error', (event) => {
              event.preventDefault();
              handleError(event.error);
            });
            
            window.top.postMessage({from: "iframe", logs}, "*");
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }

          }, false);
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    iframe.current!.srcdoc = html;
    setTimeout(() => {
      iframe.current!.contentWindow!.postMessage(bundle.code, '*');
    }, 50);
  }, [bundle.code]);

  return (
    <div className={`relative w-full h-full ${styles.preview} bg-white`}>
      <iframe
        title="preview"
        ref={iframe}
        className="w-full h-full"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;

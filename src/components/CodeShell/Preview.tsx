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
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            }

            window.addEventListener('error', (event) => {
              event.preventDefault();
              handleError(event.error);
            });

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
    <div className={`relative w-full h-full ${styles.preview}`}>
      <iframe
        title="preview"
        ref={iframe}
        className="w-full h-full"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {bundle.err && (
        <div className="absolute z-10 left-0 top-0 w-full h-full flex items-center justify-center">
          <div className="text-red-600 bg-orange-100 px-8 py-4 text-xl">
            {bundle.err}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;

import React, { useEffect, useState } from 'react';
import './App.css';
import { vscode } from './utility/vscode';
import { Message } from './dto/Message';
import { DataField } from './component/DataField';
import { smartJsonConverter } from './utility/toJson';

function App() {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const onLoaded = (event: MessageEvent) => {
      const data = (event.data as Message);
      switch (data.event) {
        case "OnData":
          setData(smartJsonConverter(data.message));
          return;
      }
    };
    window.addEventListener('message', onLoaded);
    console.log("REact loaded, posting onloadmessage")
    vscode.postMessage({
      event: "OnLoad"
    });

    return () => {
      window.removeEventListener('message', onLoaded);
    }
  }, []);
  return (
    <div className="App">

      {data && (
        <DataField label='root' value={data}/>
      )}
    </div>
  );
}

export default App;

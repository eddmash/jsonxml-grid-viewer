import React, { useEffect, useState } from 'react';
import './App.css';
import { vscode } from './utility/vscode';
import { Message } from './dto/Message';
import { DataField } from './component/DataField';
import { smartJsonConverter } from './utility/toJson';

function App() {
  const d = {
    "name": "L.J Tibbs",
    "orders": [
      {
        "name": "pizza"
      },
      {
        "name": "burger"
      },
      {
        "name": "fries",
        "ingredients": [
          "potatoe",
          "salt"
        ]
      }
    ],
    "price": {
      "amount": 100,
      "currency": "KES",
      "address": {
        "country": "Kenya",
        "city": "Nairobi"
      }
    },
    "seller": {
      "name": "MEl",
      "age": 10,
      "address": [{
        "country": "Kenya",
        "city": "Nairobi"
      }]
    }
  };
  const d1 = ["aa", "bb"]
  const d2 = {
    "address": {
      "country": "Kenya",
      "city": {
        "name": "Nairobi",
        "others": {

          "estate": "Buru"
        }
      }
    }
  }
  const d3 = {
    "world": {
      "Africa": {
        "Kenya": { "city": "Nairobi" }
      },
      "Europe": {
        "France": { "city": "Paris" }
      }
    }
  }
  const x1 = "<Stmt><Bal><Dt><DtTm>2023-09-3T20:00:00.000</DtTm></Dt></Bal><Bal><Dt><DtTm>2023-09-10T20:00:00.000</DtTm></Dt></Bal><Bal><Dt><DtTm>2023-09-20T20:00:00.000</DtTm></Dt></Bal><Bal><Dt><DtTm>2023-09-22T20:00:00.000</DtTm></Dt></Bal><Bal><Dt><DtTm>2023-09-30T20:00:00.000</DtTm></Dt></Bal></Stmt>";
  const [data, setData] = useState<any>(d3);
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
        <DataField label='root' value={data} />
      )}
    </div>
  );
}

export default App;

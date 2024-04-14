import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [prevCalculate, setPrevCalculate] = useState("");
  const [lastPressed, setLastPressed] = useState(null);
  const [firstValueEntered, setFirstValueEntered] = useState(false);

  const handleClick = (e) => {
    const value = e.target.value;

    if (!firstValueEntered && isNaN(parseInt(value)) && value !== "-") {
      return;
    } else {
      setFirstValueEntered(true);
    }
    if (
      ["/", "%", "*"].includes(lastPressed) &&
      ["/", "%", "*"].includes(value)
    ) {
      return;
    }
    if (value === "%") {
      setResult((parseFloat(result) * 0.01).toString());
      return;
    }

    setResult(result.concat(value));
    setLastPressed(value);
  };

  const clear = () => {
    setResult("");
    setPrevCalculate("");
    setLastPressed(null);
    setFirstValueEntered(false);
  };

  const calculation = () => {
    const cleanedResult = result.replace(/([-+*/])\1+/g, "$1");
    let calculatedResult = eval(cleanedResult);
    if (calculatedResult === undefined) {
      setResult("Ошибка!");
      setTimeout(() => {
        setResult("");
      }, 1500);
    }
    if (result.includes("/")) {
      calculatedResult = parseFloat(calculatedResult.toFixed(5));
    }

    setResult(calculatedResult.toString());
    setPrevCalculate(cleanedResult);
  };

  return (
    <div className="container">
      <div className="container-calculation">
        <div className="output">
          <div className="previous-calculation">{prevCalculate || 0}</div>
          <div className="active-calculation">{result || 0}</div>
        </div>
        <button onClick={clear} className="btn-top">
          C
        </button>
        <button
          onClick={() => {
            setResult(result.slice(0, -1));
          }}
          className="btn-top"
        >
          Del
        </button>
        <button onClick={handleClick} value="%" className="btn-top">
          %
        </button>
        <button onClick={handleClick} value="/" className="btn-right">
          /
        </button>
        <button onClick={handleClick} value="7">
          7
        </button>
        <button onClick={handleClick} value="8">
          8
        </button>
        <button onClick={handleClick} value="9">
          9
        </button>
        <button onClick={handleClick} value="*" className="btn-right">
          ＊
        </button>
        <button onClick={handleClick} value="4">
          4
        </button>
        <button onClick={handleClick} value="5">
          5
        </button>
        <button onClick={handleClick} value="6">
          6
        </button>
        <button onClick={handleClick} value="-" className="btn-right">
          －
        </button>
        <button onClick={handleClick} value="1">
          1
        </button>
        <button onClick={handleClick} value="2">
          2
        </button>
        <button onClick={handleClick} value="3">
          3
        </button>
        <button onClick={handleClick} value="+" className="btn-right">
          ＋
        </button>
        <button onClick={handleClick} value="0" className="two-row">
          0
        </button>
        <button onClick={handleClick} value=".">
          ,
        </button>
        <button onClick={calculation} className="btn-right">
          ＝
        </button>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function CodeLine(props) {
  //this.handleChange = this.handleChange.bind(this);

  function handleChange(e) {
    //props.CodeChange(e.target.value);
  }

  let display = props.CurrentLine === props.LineNumber ? "inline" : "none";
  return (
    <div id="code-line" className="flex flex-row">
      <div className="flex-none h-14 w-7">
        <span className="line-ind" style={{ display: display }}><img src="play.png" alt=">"></img></span>
      </div>
      <div className="flex-none h-14 w-7 text-right pr-4 pt-2 ">
        <span className="line-number text-right">{props.LineNumber}</span>
      </div>
      <div className="relative flex-auto">
        <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-md py-2 pl-5 ring-1 ring-gray-600 shadow-sm" 
          id={"code-line-" + props.LineNumber} type="text" value={props.CodeLine.Code} onChange={handleChange} ></input>
      </div>
    </div>
  )
}


function CodeSection(props) {
  const list = [];

  for(let i = 1; i <= props.MaxLines; i++) {
    list.push(<CodeLine key={i} LineNumber={i} CurrentLine={props.CurrentLine} CodeLine={props.CodeLines[i-1]} 
      CodeChange={(c) => props.CodeLines[i-1] = c} ></CodeLine>)
  }

  return (
    <div id="code-section">
      {list}
    </div>
  )
}

function App() {
  let [line, setLine] = useState(1);
  let [output, setOutput] = useState("");
  let maxLines = 10;
  //let codeLines = Array(maxLines)
  const [codeLines] = useState([])
  let [a, setA] = useState(0);
  let [b, setB] = useState(0);
  let [c, setC] = useState(0);
  let [d, setD] = useState(0);
  let [e, setE] = useState(0);


  for(let i = 0; i < maxLines; i++)
    codeLines[i] = {
      "line": i+1,
      "code": ""
    };

  function getExprVal(str) {
    let t = parseInt(str);
    if(isNaN(t)) {
      switch(str.toLowerCase()) {
        case 'a': return a;
        case 'b': return b;
        case 'c': return c;
        case 'd': return d;
        case 'e': return e;
        default: return "";
      }
    }
    
    return t;
  }

  function execLine(lineNo) {    
    let code = document.getElementById('code-line-' + lineNo).value;
    execCode(code);
  }

  function execCode(code) {    
    let tokens = code.split(' ');
    tokens = tokens.filter(t => t.trim().length > 0);
    
    if(tokens.length > 0) {

      if(tokens[0].toLowerCase() === "goto") {
        if(tokens.length > 1) {
          let newLineNo = parseInt(tokens[1]);
          if(!isNaN(newLineNo) && newLineNo >= 1 && newLineNo <= maxLines) {
            setLine(newLineNo);
            return;
          } else {
            alert("wrong line number")
          }
        }
      }
      else if(tokens[0].toLowerCase() === "print") {
        if(tokens.length > 1) {
          let t = parseInt(tokens[1]);
          if(isNaN(t)) {
            let v = "";
            switch(tokens[1].toLowerCase()) {
              case 'a': v = a; break;
              case 'b': v = b; break;
              case 'c': v = c; break;
              case 'd': v = d; break;
              case 'e': v = e; break;
              default: v = "";
            }
            if(v !== "")
              setOutput(output + v + "\n");
          } else {
            setOutput(output + t + "\n");
          }
        }
      }
      else if(tokens[0].toLowerCase() === "set") {
        if(tokens.length === 3) {
          let t = getExprVal(tokens[2]);          
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(t); break;
            case 'b': setB(t); break;
            case 'c': setC(t); break;
            case 'd': setD(t); break;
            case 'e': setE(t); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "add") {
        if(tokens.length === 3) {
          let t = getExprVal(tokens[2]);          
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(a + t); break;
            case 'b': setB(b + t); break;
            case 'c': setC(c + t); break;
            case 'd': setD(d + t); break;
            case 'e': setE(e + t); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "sub") {
        if(tokens.length === 3) {
          let t = getExprVal(tokens[2]);          
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(a - t); break;
            case 'b': setB(b - t); break;
            case 'c': setC(c - t); break;
            case 'd': setD(d - t); break;
            case 'e': setE(e - t); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "mul") {
        if(tokens.length === 3) {
          let t = getExprVal(tokens[2]);          
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(a * t); break;
            case 'b': setB(b * t); break;
            case 'c': setC(c * t); break;
            case 'd': setD(d * t); break;
            case 'e': setE(e * t); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "div") {
        if(tokens.length === 3) {
          let t = getExprVal(tokens[2]);          
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(a / t); break;
            case 'b': setB(b / t); break;
            case 'c': setC(c / t); break;
            case 'd': setD(d / t); break;
            case 'e': setE(e / t); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "input") {
        if(tokens.length > 1) {
          let t = parseInt(prompt("Enter a value:"))
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(t); break;
            case 'b': setB(t); break;
            case 'c': setC(t); break;
            case 'd': setD(t); break;
            case 'e': setE(t); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "incr") {
        if(tokens.length > 1) {
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(a + 1); break;
            case 'b': setB(b + 1); break;
            case 'c': setC(c + 1); break;
            case 'd': setD(d + 1); break;
            case 'e': setE(e + 1); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "decr") {
        if(tokens.length > 1) {
          switch(tokens[1].toLowerCase()) {
            case 'a': setA(a - 1); break;
            case 'b': setB(b - 1); break;
            case 'c': setC(c - 1); break;
            case 'd': setD(d - 1); break;
            case 'e': setE(e - 1); break;
            default: break;
          }
        }
      }
      else if(tokens[0].toLowerCase() === "if") {
        var leftVal = getExprVal(tokens[1]);
        var rightVal = getExprVal(tokens[3]);
        console.log(leftVal, rightVal);
        
        let txt = tokens.slice(4).join(' ');
        console.log(txt);
        switch(tokens[2]) {
          case '>':
            if(leftVal > rightVal) {
              execCode(txt);
              return;
            }
            break;
          case '<':            
            if(leftVal < rightVal) {
              execCode(txt);
              return;
            }
            break;
          case '=':
              if(leftVal === rightVal) {
                execCode(txt);
                return;
              }
              break;
          case '!=':
              if(leftVal !== rightVal) {
                execCode(txt);
                return;
              }
              break;
          default:
              break;
        }
      }
    }

    setLine(line + 1);
  }

  function step() {
    if(line < maxLines) {
      execLine(line);      
    }
  }

  function reset() {
    setLine(1);
    setOutput("");
    setA(0);
    setB(0);
    setC(0);
    setD(0);
    setE(0);
  }

  return (
    <div className="App flex flex-row p-4">
      <div className="basis-1/2 p-4">
        <CodeSection CurrentLine={line} MaxLines={maxLines} CodeLines={codeLines}></CodeSection>
        <div className="buttons-div">
          <button className="h-10 px-6 font-semibold rounded-md border border-gray-200 bg-red-500 text-white" type="button" onClick={reset}>Restart</button>
          <button className="h-10 px-6 font-semibold rounded-md border border-green-200 bg-green-900 text-white" type="button" onClick={step}>Step -&gt;</button>
        </div>

        <div>
          <b>Instruction Set</b>
          <ul>
            <li>goto 1</li>
            <li>print a</li>
            <li>set a 100</li>
            <li>incr a</li>
            <li>decr a</li>
            <li>if a &gt; b set a 25</li>
            <li>input a</li>
            <li>add a b</li>
            <li>sub a b</li>
            <li>mul a b</li>
            <li>div a b</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        <div className="p-4 border">
          <div id="vars"><b>VARIABLES</b></div>
          <div className="p-2"><span>A: </span> <b>{a}</b></div>
          <div className="p-2"><span>B: </span> <b>{b}</b></div>
          <div className="p-2"><span>C: </span> <b>{c}</b></div>
          <div className="p-2"><span>D: </span> <b>{d}</b></div>
          <div className="p-2"><span>E: </span> <b>{e}</b></div>
        </div>
        <div className="p-4 border">
          <div id="ou"><b>OUTPUT</b></div>
          <textarea readOnly={true} id="output" value={output}></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;

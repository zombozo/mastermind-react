import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));



class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      grid: [],
      secret_sequence: [],
      colores: [
        "7a4a6e",
        "305ee4",
        "293757",
        "aef950",
        "8ceacd",
        "a72b43",
        "fff68f",
        "019faf",
        "e6337a",
      ],
      paleta: "none",

    };
  }
  componentDidMount(){
    var sequense = []
    for (let index = 0; index < 4; index++) {
      let number = this.random();
      sequense.push(this.state.colores[number])
      
    }
    this.setState({ secret_sequence: Math.random()*8});
    this.paleta();
  }
  componentWillUnmount(){

  }
  
  paleta(){
    const colores = this.state.colores.map((code) => (
      <span className='circulo' style='background-color:#{code}' key={code}></span>
    ));
    return (
      <div className="paleta">
        {colores}
      </div>
    );
  }
  random(){
    let number = Math.floor(Math.random()*this.state.colores.lenght);
    return number
  }
  render(){
    
    return (
      <div className="Game">
        <div className="grid-juego">
          <Fila colores={this.state.colores} />
        </div>
        <div className="grid-ayuda">
          <div className="fila">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}

function Fila(props){
  const fila = new Map([
    
  ]);
  const [filaState, setFilaState] = useState([
    {1:"0000"},
    {2: "0000"},
    {3: "0000"},
    {4: "0000"},
  ]);
  const [circuloActivo, setCirculoActivo] = useState(0)
  const asignarColor = (color, key) => {
    console.log(color, key)
    let num = parseInt(key)
    setFilaState([filaState[num]={num : color }]);
    console.log(filaState);
  };
  const [paleta, setPaleta] = useState("none") 

  const handlePaleta = (key) => {
      setPaleta("flex")
      setCirculoActivo(key)
      console.log("se obtuvo estos datos: "+key)
  }
  const circulos = []
  filaState.forEach((value, key) => {
    circulos.push(
      <span
        className="circulo"
        style={{ backgroundColor: "#" + key }}
        key={key}
        onClick={handlePaleta.bind(this, key)}
      ></span>
    );
  });
  console.log("los circulos "+circulos)
  return (
    <div className="fila">
      <Paleta
        colores={props.colores}
        display={paleta}
        asignarColor={asignarColor}
        circuloActivo={circuloActivo}
      />
      {circulos}
    </div>
  );
}
function Paleta(props){
  function handlePaleta(e) {
    props.asignarColor(e, props.circuloActivo)

  }
  let circulos = props.colores.map(element => {
    return <span className='color' key={element} style={{backgroundColor:"#"+element}} onClick={handlePaleta.bind(this,element)}></span>
  });

  return <div className="Paleta"  style={{display:props.display}} >{circulos}</div>;
}









/////////////////////////////////////////////////////////////



class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state={date:new Date()};
  }
  componentDidMount(){
    this.timeID = setInterval(()=> this.tick(),1000);
  }
  componentWillUnmount(){
    clearInterval(this.timeID);
  }
  tick(){
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello world, this is my first react app</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

function App(){
  return (
    <div>
      <Toggle />
      <Game />
      <Clock />
    </div>
  );
}
root.render(<App/>);


class Toggle extends React.Component {
  constructor(props){
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(prevState=> ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
    render(){
      return(
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON':'OFF'}
        </button>
      );
    }
  }
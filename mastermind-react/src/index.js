import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));

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
      paleta: false,

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
  var circulos = []
  var count = 4
  for (let index = 0; index < count; index++) {
    circulos.push(<Circulo colores={props.colores} display="none" key={index} />);
  }
  console.log("los circulos "+circulos)
  return (
    <div className="fila">
      {circulos}
    </div>
  );
}
function Paleta(props){
  function handlePaleta(e) {
    props.asignarColor(e)
    props.setDisplay("none");
    console.log(props.display)
  }
  let circulos = props.colores.map(element => {
    
    return <span className='circulo' key={element} style={{backgroundColor:"#"+element}} onClick={handlePaleta.bind(this,element)}></span>
  });

  return <div className="Paleta"  style={{display:props.display}} >{circulos}</div>;
}




function Circulo(props){
  const [display, setDisplay] = useState("none")
  const [color, setColor] = useState("white")
  function handleClick(e){
    setDisplay("flex")
  }
  const asignarColor = (color) => {
    setColor(color)
    setDisplay("none")
  }
  return (
    <span className="circulo"  onClick={handleClick} style={{backgroundColor:"#"+color}} >
      <Paleta colores={props.colores} display={display} setDisplay={setDisplay} asignarColor={asignarColor} />
    </span>
  );
}

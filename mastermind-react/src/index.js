import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import congra from './images/congra.gif';


const image = congra.default

const root = ReactDOM.createRoot(document.getElementById('root'));



class Game extends React.Component {
  constructor(props){
    super(props);
    this.filaDefault = [
                  {color:"gray",key:1},
                  {color:"gray",key:2},
                  {color:"gray", key:3},
                  {color:"gray", key: 4}
                ]
    this.state = {
      grid: [],
      secret_sequence: [],
      colores: [
        "#7a4a6e",
        "#305ee4",
        "#293757",
        "#aef950",
        "#8ceacd",
        "#a72b43",
        "#fff68f",
        "#019faf",
        "#e6337a",
      ],
      paleta: "none",
      aciertos: [],
      final:false,
      ultimaFila:[]
    };
    this.verifyFila.bind(this)
  }
  componentDidMount(){
    var sequense = []
    for (let index = 0; index < 4; index++) {
      let number = this.random();
      sequense.push(this.state.colores[number])
      
    }
    this.setState({ secret_sequence: sequense});
  }
  componentWillUnmount(){

  }
  random(){
    let min= 0
    let max = 8
    return Math.round(Math.random()*(max-min)+min);
   
  }
  verifyFila=(colores) =>{
    let grid = this.state.grid
    grid.push(colores)
    this.setState({
      grid:grid
    })

    let filaResultados = [colores.map((color, indice)=>{
      let colorSecreto = this.state.secret_sequence[indice]
      if(colorSecreto==color.color){
        return "#00FF00"
      }else{
        let indexInSecret = this.state.secret_sequence.indexOf(color.color)
        if(indexInSecret != -1){
          return "orange"
        }
        return "gray"
      }
      
    })]

    // contar la cantidad de verdes  "#00FF00"  "orange"
    let verdes = []
    filaResultados[0].forEach((item, index)=>{
      console.log(`color:${item} :#00FF00`)
      if(item==="#00FF00"){
        verdes.push(item)
      }
    })
    console.log(verdes)
    if(verdes.length === 4){
      console.log("FELICIEDADES HAS GANADO!!!!!!!!!!!!!!")

      let NewState = this.state
      NewState.final=true
      
      this.setState(
        this.state = NewState
      )
      this.setState({ultimaFila:colores})
    }
    let log_aciertos = this.state.aciertos ? this.state.aciertos:[]
    log_aciertos.push(filaResultados)
    this.setState({
      aciertos: log_aciertos
    })

  }
  
  render(){
    const filas = this.state.grid.map(fila => {
      return <Fila filaLlena={fila} />
    })
    const filasAyuda = this.state.aciertos.map(fila=>{
      return <Fila filaAyuda={fila} />
    })
    const cerrarModal = () => {
      this.setState({final:false})
    }
    return (
      <div className="canva">
        <div className='title'>MasterMind in react</div>
        <div className='panel Game'>
            <div className="grid-juego">
              {filas}
              <Fila colores={this.state.colores} verifyFila={this.verifyFila} filaDefault={this.filaDefault} />
            </div>
            <div className="grid-ayuda">
                {filasAyuda}
            </div>
        </div>
        <div className='modal' style={{'display':this.state.final == true ?  'flex':'none'}}>
          
          <div className='panel-modal'>
            <span className='close' onClick={cerrarModal}>X</span>
            <section className='section'>
              <p className='felicidades'>!FELICIDADES  HAS GANADO¡</p>
              <img src={congra} />
              <Fila congra={this.state.ultimaFila} />
            </section>
          </div>
        </div>
      </div>
      
    );
  }
}


class Fila extends React.Component {
  constructor(props){
    super(props)
    this.coloresPaleta = props.colores
    
    this.state = {
      paleta:false,
      circuloActivo: 0,
      circulos:props.filaDefault,
      coloresFilaActiva: []
    }

    this.changePaletaStatus=this.changePaletaStatus.bind(this)
  }
  componentDidMount(circulos){

  }
  changePaletaStatus(key){
      this.setState({
        paleta: this.state.paleta ? false:true
      })
      this.setState({
        circuloActivo: parseInt(key)
      })
    }
  render(){
    
    let circulos = []
    if (this.props.filaLlena) {
      circulos = this.props.filaLlena.map((value, clave)=>{
        return <span  
                    key={value.key} 
                    className="circulo" 
                    style={{backgroundColor:value.color}}
                    onClick={(e)=> this.changePaletaStatus(value.key, e)}
                    ></span>
    })
    }else if (this.props.congra) {
      console.log(this.props.congra)
      const list = this.props.congra
      console.log(typeof(list))
      circulos = list.map((value, clave)=>{
        console.log(value)
        return <span  
                    key={clave} 
                    className="circulo" 
                    style={{backgroundColor:value.color}}
                    ></span>
    })}
    else if(this.props.filaAyuda){
      circulos = []
      for (let index = 0; index < this.props.filaAyuda.length; index++) {
        const colores = this.props.filaAyuda[index];
        circulos = colores.map((color, key)=>{
        return <span 
        key={key}
        className="circulo"
        style={{backgroundColor:color}}
        ></span>
      })
      }
      
    }else {
      circulos = this.state.circulos.map((value, clave)=>{
        return <span  
                    key={value.key} 
                    className="circulo" 
                    style={{backgroundColor:value.color}}
                    onClick={(e)=> this.changePaletaStatus(value.key, e)}
                    ></span>
    })
    }
    
    const asignarColor = (color) =>{
        this.setState({
          paleta:false
        })
        this.state.circulos.map((circulo,key)=>{
          if(circulo.key === this.state.circuloActivo){
              this.setState({
                circulos:this.state.circulos.map(value=> value.key === this.state.circuloActivo ? {color:color,key:value.key}:value)
              })
          }
        })
    }

    const resetFila = ()=>{
      this.setState({
        circulos:this.props.filaDefault
      })
    }
    if(this.props.filaLlena){
          return (
            <>
            <div className='fila'>
              {circulos}
            </div>
            </>
          )
    }else if(this.props.filaAyuda || this.props.congra){

      return(
        <>
        <div className='fila'>
          {circulos}
        </div>
        </>
      )
        
    }else {
        return(
      <>
      <div className="fila">
        <Paleta colores={this.props.colores} paletaHide={this.state.paleta} asignarColor={asignarColor} />
        {circulos}
      </div>
      <button className='check' onClick={()=> this.props.verifyFila(this.state.circulos) & resetFila()}>Check</button>
      </>
    )
    }
    
  }
}

function Paleta(props){
  function handlePaleta(e) {
    props.asignarColor(e)

  }
  let circulos = props.colores.map(element => {
    return <span className='color' key={element} style={{backgroundColor:element}} onClick={handlePaleta.bind(this,element)}></span>
  });

  return <div className="Paleta"  style={{display:props.paletaHide ? "flex":"none"}} >
    {circulos}
  </div>;
}


/////////////////////////////////////////////////////////////


function App(){
  return (
    <div>
      <Game />
    </div>
  );
}
root.render(<App/>);

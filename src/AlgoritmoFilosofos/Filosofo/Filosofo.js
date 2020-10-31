import React from "react";
import "./Filosofo.css";

class Filosofo extends React.Component{

    render() {
      {
        console.log("jejejejeje:", this.props)
        switch (this.props.accion) {
          case "Comiendo":
            return (
              <div id={this.props.id}>
                <div className="filosofo comiendo">
                    <img src={this.props.img} alt="no hay"/>
                </div>
                <h2 className="name">( {this.props.comida} ){this.props.name}</h2>
                <p className="action">{this.props.accion}</p>
              </div>
              )
              break;
          case "Pensando 🤔":
            return (
              <div id={this.props.id}>
                <div className="filosofo pensando">
                    <img src={this.props.img} alt="no hay"/>
                </div>
                <h2 className="name">( {this.props.comida} ){this.props.name}</h2>
                <p className="action">{this.props.accion}</p>
              </div>
              )
              break;
          case "Esperando 🍴":
            return (
              <div id={this.props.id}>
                <div className="filosofo esperando">
                    <img src={this.props.img} alt="no hay"/>
                </div>
                <h2 className="name">( {this.props.comida} ){this.props.name}</h2>
                <p className="action">{this.props.accion}</p>
              </div>
              )
              break;
          default:{
            return(
              <h1>JAJA</h1>
            )
            break;
          }
        }

      }
    }
}
export default Filosofo;

import React from "react";
import Filosofo from "./Filosofo/Filosofo";
import Cubierto from "./Cubierto/Cubierto";
import socrates from "../../src/socrates.jpg";
import mileto from "../mileto.jpg";
import platon from "../platon.jpg";
import aristoteles from "../aristoteles.jpg";
import heraclito from "../heraclito.jpg";

import "./algoritmoFilosofos.css";


class Filosofos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        necesidades: [
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 1],
        ],
      cola_cubiertos: [1, 2, 3, 4, 5],
      comidas: [6, 6, 6, 6, 6],
      cubiertos_libres: [],
      comiendo: [false, false, false, false, false],
      utilizando: [false, false, false, false, false],
      accion: ["Pensando 🤔","Pensando 🤔","Pensando 🤔","Pensando 🤔","Pensando 🤔"]
    };
    this.colaDeCubiertos = this.colaDeCubiertos.bind(this);
    this.comidas_restantes = this.comidas_restantes.bind(this);
    this.filosofoNecesita = this.filosofoNecesita.bind(this);
    this.comiendo = this.comiendo.bind(this);
    this.esperando = this.esperando.bind(this);
  }
  // Cambia la acción del filósofo a esperando y espera un poco
  esperando( f ){
    return new Promise((resolve, reject) => {
      let a = this.state.accion
      a[f] = "Esperando 🍴"
      this.setState({accion: a})
        setTimeout(() => {
            resolve("gggg")
        }, 1000);
    })
    
}
  //Devuelve true cuando ya todos los filosofos comieron
  comidas_restantes = () => {
      console.log("resta_algo")
    return new Promise((resolve, reject) => {
        
        console.log("comidas van...", this.state.comidas)
        for (const f of this.state.comidas) {
            if (f !== 0){
                console.log("el F", f, "sigue necesitando comer")
                resolve(true)
                return true;
            } 
        }
        console.log("Ya tosos")
        reject(false)
        return false;
    })
  };
  filosofoNecesita = (libres) => {
    return new Promise((resolve, reject) => {
      let necesidades = this.state.necesidades;
      console.log("Buscando alguien que encesite:", libres);
      for (const i in necesidades) {
        const filosofo = necesidades[i];
        let orden_1 = filosofo[0] == libres[0] && filosofo[1] == libres[1];
        let orden_2 = filosofo[1] == libres[0] && filosofo[0] == libres[1];
        console.log("condición1:", orden_1, filosofo, libres);
        console.log("condición2:", orden_2, filosofo, libres);
        if (orden_1 || orden_2) {
          resolve(i);
          return true;
        }
      }
      reject(false);
    });
  };
  comiendo(f) {
    return new Promise((resolve, reject) => {
        if( this.state.comidas[f] <= 0 ){
            reject("Ya se llenó")
        }

      console.log("Comiendo", f, this.state.comiendo);
      // Cambios de variables al comer
      let cola_cubiertos = this.state.cola_cubiertos;
      let libres = this.state.cubiertos_libres;
      let a = this.state.accion
      a[f] = "Comiendo"
      // Colorea los cubiertos usados
      let u = this.state.utilizando
      let usado1 = libres[0]-1
      let usado2 = libres[1]-1
      u[usado1] = true
      u[usado2] = true
      let comidas = this.state.comidas;
      comidas[f] = comidas[f] - 1;
      cola_cubiertos.push(libres[0]);
      libres.shift();
      cola_cubiertos.push(libres[0]);
      libres.shift();
      // Colorea elq eu come
      let c = this.state.comiendo;
      c[f] = true;
      // Aplica cambios de colores en filosofos y en cubiertos y el número de comidas
      this.setState({ comiendo: c, utilizando: u, comidas, comidas, accion: a });
      

      setTimeout(() => {
        console.log("yum yum");
        c[f] = false;
        u[usado1] = false
        u[usado2] = false
        a[f] = "Pensando 🤔"
        this.setState({
          cola_cubiertos: cola_cubiertos,
          cubiertos_libres: libres,
          comiendo: c,
          utilizando: u,
          accion: a
        });
        resolve(true);
      }, 1500);
    });
  }
  // Comentarios para el reporte
  async colaDeCubiertos() {
    // Este programa está hecho en react, por lo que la cola de cubiertos y otras cariables están en el "estado" de este componente.
    // Por ese motivo para actualizar losdatos debe de utilizarse la función setState({}) que es propia de React. 
    // Para eso antes de modificar las listas hayq ue generar una nuva igual a la que está en el estado, modificarla y después actualizatr el estado con la lsita modificada
    try {
        let resta_algo =  await this.comidas_restantes() // Revisa si aún hay filósfos por comer
        while ( resta_algo != false ) {
            let cola_cubiertos = this.state.cola_cubiertos;
            let a = cola_cubiertos[0];    // Obtiene el siguiente cubierto en la cola
            cola_cubiertos.shift();       // Saca el cubierto de la cola
            this.setState({ cola_cubiertos: cola_cubiertos });  // Actualiza la cola en el estado de la aplicación.
                                                                // Esto se debe a que necesito actualizarlo para que react
                                                                // renderice de neuvo el componente y cambie el texto en cada filósofo
            let cubiertos_libres = this.state.cubiertos_libres;
            cubiertos_libres.push(a);     // Se añade el cubierto que estaba en el frente de la cola a los diponibles apra usar
            this.setState({ cubiertos_libres: cubiertos_libres });  // Actualiza los cubiertos disponibles para usar en el estado de la aplicación
            try {
              //Encuentra al filosofo que puede comer con esos cubiertos libres
              let filosofo = await this.filosofoNecesita(cubiertos_libres); //Encuentra al filosofo que puede comer con esos cubiertos libres
              await this.esperando( filosofo )  // Cambia el estado del filósofo a esperando.
                                                // Espera un momento (1000ms) para visualizar 
                                                // la lista de cubiertos disponibles
              // console.log(" Come el filosofo: ", filosofo);
              await this.comiendo(filosofo);    // Actualiza el estado del filósofo a comiento
                                                // Quita los subiertos de los disponibles
                                                // Espera 1500ms para visualizar como come ( los colores y el texto )
                                                // Disminuye el número de comidas del filósofo en 1
                                                // Al termianr de comer. Cambia de nuevo el estado del filósofo a pensando 
                                                // Vuelve a meter los cubeirtos usados en la cola de cobiertos
              resta_algo = await this.comidas_restantes() // Revisa si aún hay filósfos por comer
            } catch (error) {
              // Si no se encontró nigún filósofo que ´pueda comer con lso libres se llega aquí
              resta_algo = await this.comidas_restantes() // Revisa si aún hay filósfos por comer
            } 
          }
    } catch (error) {
        // Ya no hay más comidas restantes para nigún filósofo.
        console.log("Pues ya se terminó")
        window.alert("Listo!")
    }
  }

  render() {
    return (
      <div className="filosofos">
        <div className="colaDecubiertos">
          <button onClick={this.colaDeCubiertos}>plaaay</button>
          <h2>Cola de cubiertos</h2>
          <ul>
            {this.state.cola_cubiertos.map((c, i) => (
              <li key={i}>Cubierto {c}</li>
            ))}
          </ul>
          <h2>Disponibles para uso</h2>
          <ul>
            {this.state.cubiertos_libres.map((c, i) => (
              <li key={i}>Cubierto {c}</li>
            ))}
          </ul>
        </div>
        <Cubierto id="cubierto_1" utilizando={this.state.utilizando[0]}/>
        <Filosofo
          id="filosofo_1"
          accion={this.state.accion[0]}
          comida={this.state.comidas[0]}
          comiendo={this.state.comiendo[0]}
          name="Sócrates"
          img={socrates}
        />
        <Cubierto id="cubierto_2" utilizando={this.state.utilizando[1]}/>
        <Filosofo
          id="filosofo_2"
          accion={this.state.accion[1]}
          comida={this.state.comidas[1]}
          comiendo={this.state.comiendo[1]}
          name="Tales de Mileto"
          img={mileto}
        />
        <Cubierto id="cubierto_3" utilizando={this.state.utilizando[2]}/>
        <Filosofo
          id="filosofo_3"
          accion={this.state.accion[2]}
          comida={this.state.comidas[2]}
          comiendo={this.state.comiendo[2]}
          name="Platón"
          img={platon}
        />
        <Cubierto id="cubierto_4" utilizando={this.state.utilizando[3]}/>
        <Filosofo
          id="filosofo_4"
          accion={this.state.accion[3]}
          comida={this.state.comidas[3]}
          comiendo={this.state.comiendo[3]}
          name="Aristóteles"
          img={aristoteles}
        />
        <Cubierto id="cubierto_5" utilizando={this.state.utilizando[4]}/>
        <Filosofo
          id="filosofo_5"
          accion={this.state.accion[4]}
          comida={this.state.comidas[4]}
          comiendo={this.state.comiendo[4]}
          name="Heráclito"
          img={heraclito}
        />
      </div>
    );
  }
}
export default Filosofos;

import React from "react";
import "./Cubierto.css";
import cubiertopng from "../../cubierto.png"

const Cubierto = (props) => {
//   const [values, setValues] = useState({
//     redirect: false,
//   });
//
  return (
    <div id={props.id} className={(props.utilizando) ? "cubierto utilizado": "cubierto"}>
        <img src={cubiertopng} alt="cubierto"/>
        {props.id}
    </div>
  );
};
export default Cubierto;

import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
import Button from '@mui/material/Button';

const Qunatity = (props) => {
  const [inputVal, setInputVal] = useState(1);

  useEffect(() => {
    if (props?.value !== undefined && props?.value !== null && props?.value !== "") {
      setInputVal(parseInt(props?.value));
    }
  }, [props.value]);

  const minus = () => {
    if (inputVal > 1) {
      setInputVal(inputVal - 1);
    }
  }

  const plus = () => {
    setInputVal(inputVal + 1);
  }

  useEffect(() => {
    if (props.quantity) {
      props.quantity(inputVal);
      props.selectedItem(props.item, inputVal);
    }
  }, [inputVal]);

  return (
    <>
      <div className="quantityDrop d-flex align-items-center qt-btn">
        <Button onClick={minus}><FaMinus /></Button>
        <input type='text' value={inputVal} readOnly />
        <Button onClick={plus}><FaPlus /></Button>
      </div>
    </>
  );
}

export default Qunatity;


// import React, { useEffect, useState } from 'react'
// import { FaMinus } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import Button from '@mui/material/Button';
// const Qunatity = (props) => {
//     const [inputVal,setInputVal]=useState(1);

//     useEffect(()=>{
//     if(props?.value!==undefined && props?.value!==null && props?.value!==""){
//       setInputVal(parseInt(props?.value))
//     }
//     },[props.value])

//     const minus=()=>{
//        if(inputVal!==1 && inputVal>0){
//         setInputVal(inputVal-1);
//        }
//     }

//     const plus=()=>{
//         setInputVal(inputVal+1);
//     }

//     useEffect(() => {
//       if (inputVal !== 1 && props.quantity) {
//         props.quantity(inputVal);
//         props.selectedItem(props.item,inputVal);
//       }
//     }, [inputVal]);
    
    
//   return (
//     <>
//                  <div className="quantityDrop d-flex align-items-center qt-btn">
//                  <Button onClick={minus}><FaMinus /></Button>
//                  <input type='text' value={inputVal} />
//                  <Button onClick={plus}><FaPlus /></Button>
//                   </div>
//     </>
//   )
// }

// export default Qunatity

import React, { useRef, useEffect} from 'react';

import './App.css';
import {Circle, GsapWrapper} from './componnents/circle';
import { TimelineMax } from 'gsap';


function App() {

var circleAnim = useRef(null);


useEffect(()=>{
  let timeline = new TimelineMax();
  // timeline.add(circleAnim.current)

},[])



  return (
    <div className="App">
     <svg xmlns="http://www.w3.org/2000/svg" width= '800' height='600'>      
 
       <GsapWrapper
        from={{attr:{cx:300}, style:{opacity:.2, fill:'#1dde1d'}}} 
        to={{attr:{cx:100}, style:{opacity:1, fill:'#eb4034'}}}
        config= {{ duration:2}}
        ref = {circleAnim}
         >
          <Circle attr={{cx:400, cy:100, r:40}} style={{stroke:'blue', fill:'blue'}}  /> 
       </GsapWrapper>
     </svg>
     <button className = 'animate' 
     > animate me</button>
    </div>
  );
}




export default App;

import React, {useEffect, useState} from 'react';
import { TimelineLite } from 'gsap';



const Circle= React.forwardRef((props, ref)=>{
    
    let attr = props.attr;
    let style = {
        stroke: 'blue', 
        fill: 'blue', 
        
        ...props.style
    }
    
    

    return (
        <circle  {...attr} {...style}  ref= {ref} />
    );
}
)

const GsapWrapper = React.forwardRef((props, ref)=>{

    var
        to = props.to,
        from = props.from,
        config = props.config;
   
    const [compProps, setter] = useState(props.children.props);
   
    
    
    useEffect(()=>{
        
        var attrFrom;
        var styleFrom;
        
        if(from.hasOwnProperty('attr')){
            attrFrom={...from['attr']}
        }
        if(from.hasOwnProperty('style')){
            styleFrom={...from['style']}
        }

        var anim = () => {
            let timeline = new TimelineLite();
            timeline.to(attrFrom, config.duration, {
                    ...to['attr'],
                    onUpdate: onOpdateFunc,
                    ease: config.ease,
                    delay: config.delay
                })
                .to(styleFrom, config.duration, {
                    ...to['style'],
                    onUpdate: onOpdateFunc,
                    ease: config.ease,
                    delay: config.delay
                }, `+= -${config.duration}`)

            // timeline.to(animObj, 4, {...to, ease:Back.easeOut, onUpdate: onOpdateFunc});
            function onOpdateFunc() {
                setter(curr => ({
                    style: {
                        ...curr['style'],
                        ...filterTween(styleFrom)
                    },
                    attr: {
                        ...curr['attr'],
                        ...filterTween(attrFrom)
                    }
                }))
            } // onOpdateFunc
        return timeline
        } // anim
       
    
        ref.current = anim;
    },[config, from, to, ref]) //TODO: could these dependencies be problematic if you change for ex. conf somewhere in your app before current animation finished ?
    
    return(
        React.cloneElement(props.children, {...compProps })
    );

})




//                 utility functions                         //
//////////////////////////////////////////////////////////////
const filterTween = function(props){
    // filters out the thweeId added by gsap to the object
    //TODO: see if you can find a better solutionn for filtering ...
    let newObj= {};
    newObj= {...props};
    if(newObj.hasOwnProperty('_gsTweenID')){
        delete newObj['_gsTweenID']
    }
    

    return newObj
} 


export{Circle, GsapWrapper}



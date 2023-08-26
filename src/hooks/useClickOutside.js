import { useEffect, useRef } from "react";

export function useClickOutside(close, listenEvent = true){
    const ref = useRef();

useEffect(()=>{
  function handleclick(e){
    if(ref.current && !ref.current.contains(e.target)){
      close()
    }
  }
  
  document.addEventListener('click', handleclick ,listenEvent);

  return ()=>document.removeEventListener('click', handleclick, listenEvent);
},[close, listenEvent])
return ref

}
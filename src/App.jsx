import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const [copy,setCopy]=useState(false);
  const [color,setColor]=useState('blue');


  
  //useRef
  const passwordRef=useRef(null)
  
  //copyToClipboard
  const copyToClipboard=()=>{
       passwordRef.current?.select();
       password.current?.setSelectionRange(0,51)
       window.navigator.clipboard.writeText(password)
       setCopy(true);
       setColor('green')
      
  }
  
  const passwordGenerator=useCallback(()=>{
        let pass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabckefghijklmnopqrstuvwxyz";

        if(numberAllowed) str+="1234567890"
        if(charAllowed)  str+="!@#$%^&*"

      for (let i = 1; i <=length; i++) {
           let char =Math.round(Math.random()*str.length+1)
           pass+=str.charAt(char)
           
      }

          setPassword(pass);
  },[length,numberAllowed,charAllowed])
      
  useEffect(()=>{
       passwordGenerator();
       setCopy(false)
        setColor('blue');
  },[length,numberAllowed,charAllowed])
        
  
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 py-2 my-8 text-orange-500 bg-gray-700  '>
       <h1 className='text-2xl text-white text-center m-2'>Password Generator</h1>
       
       <div className='flex shadow rounded
        overflow-hidde mb-4 '> 
       <input
       className='rounded-l-lg outline-none w-full px-3 py-2'
        type="text" 
        value={password} 
        placeholder='Password'
        ref={passwordRef} />
        <button style={{backgroundColor:color}} onClick={copyToClipboard} className='copy-btn outline-none  text-white px-3 py-0.5 shrink-0 rounded-r-lg'>{copy?"copied":"copy"}</button>
       </div>

        
       <div className='flex text-sm gap-x-2'>
         <div className='flex items-center gap-x-1'>
          <input type='range'
           min={6}
           max={50} 
           value={length}
           onChange={(e)=>{setLength(e.target.value) }}/>
          <label>Length: {length}</label>
         </div>
         
         <div className='flex items-center gap-x-1'>
          <input type='checkbox'
           defaultChecked={numberAllowed}
           id='numberInput'
           onChange={()=>{setNumberAllowed((prev)=>!prev) }}/>
          <label>Numbers</label>
         </div>

         <div className='flex items-center gap-x-1'>
          <input type='checkbox'
           defaultChecked={charAllowed}
           id='charInput'
           onChange={()=>{setCharAllowed((prev)=>!prev) }}/>
          <label>Character</label>
         </div>
       </div>

       
         
       
      
    </div>
  )
}

export default App

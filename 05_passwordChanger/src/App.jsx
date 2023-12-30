import { useState, useCallback , useEffect, useRef} from 'react';

import './App.css'

function App() {
  const [length , setlength] = useState(8);
  const [numberallowed , setnumberallowed] = useState(false);
  const [charallowed , setcharallowed] = useState(false);
  const [password , setpassword] = useState("");

  // use ref

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhgijklmnopqrstuvwxyz";
    if (numberallowed ) str += "1234567890"
    if (charallowed) str +="~`!@#$%^&*()_-{}:?><,./;'][|'";
     for (let index = 1; index <= length; index++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char);
    }
    setpassword(pass)
  } , [ length,numberallowed, charallowed, setpassword])

   const copyPasswordToClipboard = useCallback(() => {
       passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
     },
     [password],
   )
   
 
       useEffect(() =>{passwordGenerator()},[length,numberallowed,charallowed,passwordGenerator]
       )

       

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-12 my-40 text-black bg-gray-500'>
      PasswordGenerator
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <  input type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='Password'
           ref={passwordRef}
           readOnly
        />
        <button
          onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={8}
          max={100}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label >
            Length:{length}
          </label>

        </div>
        <div className='flex item-center gap-x-1'>
          <input type="checkbox"
          defaultChecked ={numberallowed}
          id="numberInput"
          onChange={() =>{
            setnumberallowed((prev)=> !prev);
          }}

          />
         Number
        </div>
        <div className='flex item-center gap-x-1'>
          <input type="checkbox"
          defaultChecked = {charallowed}
          id="charInput"
          onChange={()=>{
            setcharallowed((prev)=>!prev);
          }}
          
          />
         Character
        </div>
      </div>
     </div>
    </>
  )
}

export default App

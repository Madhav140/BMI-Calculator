import './App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useState } from 'react';


function App() {

  const[bmi, setbmi] = useState(0)
  const[weight, setweight] = useState(0)
  const[height, setheight] = useState(0)
  

  const[isweight, setisweight] = useState(true)  /* for conditional rendering */
  const[isheight, setisheight] = useState(true)
 

  const getvalidate = (e)=>{
          const {name,value}= e.target
    
          if(!!value.match(/^[0-9]*.?[0-9]+$/)){

           if(name==='weight'){
              setweight(value)
              setisweight(true)
            }
           else if(name==='height'){
              setheight(value)
              setisheight(true)
            }   
        
          }
          else{

            if(name==='weight'){
              setweight(value)
              setisweight(false)
            }
           else if(name==='height'){
              setheight(value)
              setisheight(false)
            }  
          
          }                                  
  }

  const handlecalculate = (n)=>{
    n.preventDefault()  
    if(!height || !weight){
      alert('please fill the form')
    }
    else{
    var  result = weight/height**2 
      setbmi(result.toFixed(2))
    }
  }

  const handlereset = ()=>{
    setbmi(0)
    setweight(0)
    setheight(0)
    setisheight(true)
    setisweight(true)
  }

  if(bmi==0){
   var color = 'lightblue'
   var para = 'Are you Healthy?'
  }
  else if(bmi<18.5){
    var color = 'red'
    var para = 'Underweight'
  }
  else if(18.5<=bmi && bmi<=24.9){
    var color = 'green'
    var para = 'Healthy'
  }
  else if(25<=bmi && bmi<=29.9){
    var color = 'darkorange'
    var para = 'Overweight'
  }
  else if(bmi>=30){
    var color = 'red'
    var para = 'Obese'
  }

  return (
   <>
   <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center w-10 bg-dark'> 
   <div className='bg-light p-5 rounded' style={{width:'500px'}}> 
   <h1>Body Mass Index</h1>
   <p>Calculate your BMI Easily</p>

 {<div style={{backgroundColor:`${color}`}} className='d-flex justify-content-center align-items-center w-100 p-3 rounded flex-column'>
    <h1>{bmi}</h1>
    <p>{para}</p>
   </div>}

   <form className='mt-5' onSubmit={handlecalculate}>

          <div className='mb-3'> 
          <TextField name='weight' value={weight || ''} onChange={(e)=>getvalidate(e)} className='w-100' id="outlined-basic" label="Weight(kg)" variant="outlined" />
          </div>
          { !isweight &&    
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}

          <div className='mb-3'> 
          <TextField name='height' value={height || ''} className='w-100' id="outlined-basic" label="Height(m)" variant="outlined" onChange={(e)=>getvalidate(e)} />
          </div>
          { !isheight &&     
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}

          
          <Stack className='mt-5' direction="row" spacing={2}>
               <Button type='submit' disabled={isweight && isheight?false:true} className='bg-success' style={{width:'200px',height:'50px'}} variant="contained">Calculate</Button>
               <Button onClick={handlereset} style={{width:'200px',height:'50px'}} variant="outlined">Reset</Button>
          </Stack>

   </form>
   </div>
   </div>
   </>
  );
}

export default App;

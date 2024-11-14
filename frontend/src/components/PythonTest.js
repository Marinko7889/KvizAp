import React, { useEffect, useState } from 'react'
import Questions from "./Questions"
import { useSelector,useDispatch } from 'react-redux';
// import {useSelector,useDispatch} from "react-redux"
 import { MoveNextQuestion, MovePrevQuestion} from '../hooks/FetchQuestion'
 import { PushAnswer } from '../hooks/setResult'
import { Navigate } from 'react-router-dom';
export default function PythonTest(){

    const [check, setChecked] = useState(undefined)
    const result=useSelector(state=>state.result.result)
    //const { queue, trace } = useSelector(state => state.questions);
    //const trace=useSelector(state=>state.questions.trace)
    const {queue,trace}=useSelector(state=>state.questions)

    const dispatch=useDispatch()
    //const trace=useSelector(state=>state.questions.trace);
    //const {queue,trace}=useSelector(state=>state.questions);
    // const state=useSelector(state=>state)
    

    // useEffect(()=>{
    //   console.log(result)
    // })

    function onNext(){ 
      if(trace<queue.length){
        dispatch(MoveNextQuestion())
        //dispatch(PushAnswer(check))
        if(result.length<=trace){
          dispatch(PushAnswer(check))
        }
      }
      setChecked(undefined)
           
           
      }
    function onPrev(){
      if(trace>0){
        dispatch(MovePrevQuestion())
        console.log("On Prev click");  
      }     
    }
    if(result.length && result.length>=queue.length){
        return <Navigate to={"/result"} replace="true"></Navigate>
    }

    function onChecked(check){
      console.log(check)
      setChecked(check)
    }
  return (
    <div className="container">
      <h1 className='title text-light'>Python test</h1>
      
      <Questions onChecked={onChecked}/>

      <div className='grid'>
        {trace>0 ? <button className='btn prev' onClick={onPrev}>Prev</button>:<div></div>}

        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}


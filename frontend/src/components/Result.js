import React, { useEffect } from 'react'
import "../styles/result.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attemps_Number,earnPoints_Number,flagResult } from '../helper/helper'

export default function Result() {
    const dispatch=useDispatch();

    const {questions:{queue,answers},result:{result,userId}}=useSelector(state=>state)
    
    useEffect(()=>{
        console.log(flag)
    })


    const totalPoints=queue.length*10;
    const attempts=attemps_Number(result)
    const earnPoints=earnPoints_Number(result,answers,10)
    const flag=flagResult(totalPoints,earnPoints)



    function onRestart(){
        console.log("on restart")
        dispatch(resetAllAction())
        dispatch(resetResultAction())
        
    }
  return (
    <div className='container'>
        <h1 className='title text-light'>Python test</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Total points</span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total questions</span>
                <span className='bold'>{queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts</span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total earn points</span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Test result</span>
                <span style={{color:`${flag ? "#2aff95" : "#ff2a66"}`}} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>

        <div className='start'>
            <Link className='btn' to="/welcome" onClick={onRestart}>Restart</Link>
        </div>
        <div className='container'>
            {/* <ResultTable></ResultTable> */}
        </div>
    </div>
  )
}

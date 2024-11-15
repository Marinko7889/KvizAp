import { useEffect, useState } from "react"
import data from "../database/data"
import { useFetchQuestion } from "../hooks/FetchQuestion"
import { useDispatch, useSelector } from "react-redux";
import { updateResultAction } from "../redux/result_reducer";
import { updateResult } from "../hooks/setResult";

export default function Questions({onChecked}) {
    const [checked, setchecked] = useState(undefined)
    const {trace}=useSelector(state=>state.questions)
    const result=useSelector(state=>state.result.result)
    useSelector(state=>console.log(state));
    const [{isLoading,apiData,serverError}]=useFetchQuestion(); 
    useSelector(state=>console.log(state))
    const questions=useSelector(state=>state.questions.queue[state.questions.trace])
    const dispatch=useDispatch();
    
    //const trace=useSelector(state=>state.questions.trace)
    useEffect(()=>{
        //console.log(questions)
        console.log({trace,checked})
        dispatch(updateResult({trace,checked}))
    },[checked])

   
    function onSelect(i) {
        //console.log(i)

        onChecked(i)
        setchecked(i)
        dispatch(updateResult({trace,checked}))

    }
    if(isLoading) return <h3 className="text-light">isLoading</h3>
    if(serverError) return <h3 className="text-light">{serverError || "unknown error"}</h3>


    return (
        <div className="questions">
            <h2 className="text-light">{questions?.question}</h2>
            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i}>
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q˘${i}-option`}
                                onChange={()=>onSelect(i)}
                            />
                            <label className="text-primary" htmlFor={`q˘${i}-option`}>{q}</label>
                            <div className={`check ${result[trace]==i ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}

import  useTimer  from "../../../hooks/useTimer"
import "./ProgressBar.css"

export default function ProgressBar({setLoading}){
    const clipPathValue = useTimer(2.5, setLoading, false)
    return(
        <div className="progress-bar-container">
            <div
                  className="background-progress-bar"
                  style={{ clipPath: clipPathValue }}
                />
        </div>
    )
}
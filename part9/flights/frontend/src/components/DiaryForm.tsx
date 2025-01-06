import { useState } from "react"
import { Visibility, Weather } from "../types"


interface DiaryFormType {
    addEntry: (date: string, visibility: string, weather: string, comment: string) => void
}

const DiaryForm = ({addEntry}: DiaryFormType) => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const handleAdd = (event: React.SyntheticEvent) => {
        event.preventDefault()    
        addEntry(date, visibility, weather, comment)
        
        setDate('')
        setComment('')
    }

    return (
        <div>
            <h2>Add new entry</h2>
            
            <form onSubmit={handleAdd}>
                <div>
                    date
                    <input
                        type="date"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                    />
                </div>
                <div>
                    visibility: 
                    {Object.values(Visibility).map(v => 
                        <span key={v}><input
                            type="radio"
                            name="visibility"
                            onChange={() => setVisibility(v)}
                        />{ v }</span>
                    )}
                </div>
                <div>
                    weather
                    {Object.values(Weather).map(v => 
                        <span key={v}><input
                            type="radio"
                            name="weather"
                            onChange={() => setWeather(v)}
                        />{ v }</span>
                    )}
                </div>
                <div>
                    comment
                    <input
                        type="text"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )

}

export default DiaryForm
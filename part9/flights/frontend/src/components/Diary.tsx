
import { DiaryEntry } from "../types"

interface DiaryType {
    entries: DiaryEntry[];
    toggleComments: () => void;
}

const Diary = ({ entries, toggleComments }: DiaryType) => {
    
    return (
        <div>
            <h2>Diary Entries</h2>
            <button onClick={toggleComments}>Toggle Comments</button>
            {entries.map(entry => 
                <div key={entry.id}>
                    <p><strong>{entry.date}</strong></p>
                    visibility: {entry.visibility} <br/>
                    weather: {entry.weather} <br />
                    {entry.comment && (<>comment: {entry.comment }</>)}
                </div>
            )}
        </div>
    )
}

export default Diary
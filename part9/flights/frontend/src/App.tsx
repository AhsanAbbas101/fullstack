import { useEffect, useState } from 'react'

import { DiaryEntry, DiaryEntrySchama } from './types';

import Diary from './components/Diary'

import service from './services/DiaryService'


import DiaryForm from './components/DiaryForm';
import { serviceErrorHandler } from './utils';
function App() {

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [displayComments, setDisplayComments] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('')

  const setError = (msg: string): void => {
    setErrorMsg(msg)
    setTimeout(() => setErrorMsg(''), 6000)
  }

  useEffect(() => {

    const populateDiary = async () => {
      try {
        const data = await service.getAll()
        const comments = await service.getComments()
        const update = data.map(entry => {
          const c = comments.find(c => c.id === entry.id)
          return c ? { ...entry, comment: c.comment } : entry
        })
        setEntries(update)
      }
      catch (error: unknown) {
        setError(serviceErrorHandler(error));
      }
      
    }
    
    void populateDiary();
  }, [])

  const addEntry = (date: string, visibility: string, weather: string, comment: string) => {

    try {
      const newEntry = DiaryEntrySchama.omit({ id: true }).parse({
        date, visibility, weather, comment
      })
      
      service
        .addEntry(newEntry)
        .then(entry => setEntries(entries.concat(entry)))
        .catch((error) => setError(serviceErrorHandler(error)))
    }
    catch (error: unknown) {
      setError(serviceErrorHandler(error))
    }
  }
  
  return (
    
    <>
      <p style={{color:'red'}}>{ errorMsg }</p>
      <DiaryForm addEntry={addEntry}/>
      <Diary
        entries={!displayComments ? entries.map(e => ({ ...e, comment: undefined })) : entries}
        toggleComments={() => setDisplayComments(!displayComments)}
      />
    </>
  )
}

export default App

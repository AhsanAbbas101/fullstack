import { useEffect, useState } from 'react'

import { DiaryEntry } from './types';

import Diary from './components/Diary'

import service from './services/DiaryService'

function App() {

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [displayComments, setDisplayComments] = useState<boolean>(false);

  useEffect(() => {
    try {
      service
        .getAll()
        .then(data => { 
          setEntries(data)
          service
            .getComments()
            .then(comments => {
              const update = data.map(entry => {
                const c = comments.find(c => c.id === entry.id)
                return c ? { ...entry, comment: c.comment } : entry
              })
              setEntries(update)
            })
        })
    
    }
    catch (error: unknown) {
      if (error instanceof Error)
        console.log(error.message);
      else
        console.log(`unhandled error type ${typeof error}`);
    }

  }, [])


  
  return (
    
    <>
      <Diary
        entries={!displayComments ? entries.map(e => ({ ...e, comment: undefined })) : entries}
        toggleComments={() => setDisplayComments(!displayComments)}
      />
    </>
  )
}

export default App

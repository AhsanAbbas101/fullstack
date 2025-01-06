import axios, { AxiosError } from 'axios'
import { DiaryEntry, DiaryEntrySchama, DiaryCommentEntry } from '../types';
import { z } from 'zod'

const API_BASE_URL = '/api/diaries'

const getAll = () => {

  return axios
    .get<DiaryEntry[]>(API_BASE_URL)
    .then(result => {
      return z.array(DiaryEntrySchama).parse(result.data);
     })
    .catch((error: unknown) => {
      
      if (error instanceof z.ZodError)
      {
        console.log('invalid data recieved.');
      }
      if (error instanceof AxiosError) {
        console.log(error.name);
        console.log(error.message);
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        }
      }
      throw error;
    });

}

const getComments = () => {

  return axios
    .get<DiaryCommentEntry[]>(`${API_BASE_URL}/comments`)
    .then(result => {
      return z.array(z.object({ 'id': z.number(), 'comment': z.string() })).parse(result.data);
    })
}

export default {
  getAll,
  getComments
}
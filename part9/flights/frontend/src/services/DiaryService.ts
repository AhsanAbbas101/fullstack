import axios from 'axios'
import { DiaryEntry, DiaryEntrySchama, DiaryCommentEntry, NewDiaryEntry } from '../types';
import { z } from 'zod'
import { serviceErrorHandler } from '../utils';

const API_BASE_URL = '/api/diaries'

const getAll = () => {

  return axios
    .get<DiaryEntry[]>(API_BASE_URL)
    .then(result => {
      return z.array(DiaryEntrySchama).parse(result.data);
     })
    .catch((error: unknown) => {
        throw new Error(serviceErrorHandler(error))
    });

}

const getComments = () => {

  return axios
    .get<DiaryCommentEntry[]>(`${API_BASE_URL}/comments`)
    .then(result => {
      return z.array(z.object({ 'id': z.number(), 'comment': z.string() })).parse(result.data);
    })
    .catch((error: unknown) => {
        throw new Error(serviceErrorHandler(error))
    });
}

const addEntry = (entry: NewDiaryEntry)  => {
  return axios
    .post<DiaryEntry>(API_BASE_URL, entry)
    .then(res => res.data)
    .catch((error: unknown) => {
        throw new Error(serviceErrorHandler(error))
    });
}

export default {
  getAll,
  getComments,
  addEntry
}
import {z} from 'zod'

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

/*
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
*/

export const DiaryEntrySchama = z.object({
  id: z.number(),
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional()
})

export type DiaryEntry = z.infer<typeof DiaryEntrySchama>;

export type DiaryCommentEntry = Pick<DiaryEntry, 'id' | 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
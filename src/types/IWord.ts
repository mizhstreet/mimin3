export interface IWord {
  id: number;
  kanji: string;
  hira: string;
  meaning: string;
  vn: string;
  romaji?: string;
  example: string;
  exampleMeaning: string;
  audio: any;
  exampleAudio: any;
  favorite?: boolean;
}

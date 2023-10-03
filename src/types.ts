// types.ts
export interface JokeParams {
    category: string;
    type: string;
    flags: {
      nsfw: boolean;
      religious: boolean;
      political: boolean;
      racist: boolean;
      sexist: boolean;
      explicit: boolean;
    };
    lang: string;
  }
  
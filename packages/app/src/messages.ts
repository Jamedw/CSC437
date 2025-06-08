import { MovieRound, MovieRoyale, Movie, User} from "server/models";

export type Msg =
| ["profile/save", { userid: string; profile: Partial<User>; onSuccess?: () => void; onFailure?: (err: Error) => void; }]
| ["profile/select", { userid: string; onSuccess?: () => void; onFailure?: (err: Error) => void; }]
  | ["user/select", { userid: string; onSuccess?: () => void; onFailure?: (err: Error) => void; }]
  | ["movieRoyales/create", { title: string; creatorId: string; onSuccess?: (newRoyale: MovieRoyale) => void; onFailure?: (err: Error) => void; }]

  | [ "movieRoyales/join",
      {
        royaleId: string;
        userId: string;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "movieRoyales/startRound",
      {
        royaleId: string;
        creatorId: string;
        movieIds: string[];
        onSuccess?: (newRound: MovieRound) => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "movieRoyales/submitVote",
      {
        royaleId: string;
        roundId: string;
        userId: string;
        votes: { movieId: string; score: number; }[];
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "movies/search",
      {
        query: string;
        limit?: number;
        offset?: number;
        onSuccess?: (movies: Movie[]) => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "profile/addFavoriteMovie",
      {
        userId: string;
        movieId: string;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "profile/removeFavoriteMovie",
      {
        userId: string;
        movieId: string;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "profile/addFriend", 
      {
        userId: string;       
        friendId: string;     
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "profile/removeFriend", 
      {
        userId: string;       
        friendId: string;     
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ];
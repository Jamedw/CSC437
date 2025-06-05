import { User, MovieRoyale } from "server/models"; 
export type Msg =
  | [ "profile/select", { userid: string }]
  | [ "profile/save",
      {
        userid: string; 
        profile: Partial<User>; 
        onSuccess?: () => void; 
        onFailure?: (err: Error) => void; 
      }
    ]
  | [ "movieRoyales/create",
      {
        title: string; 
        creatorId?: string; 
        onSuccess?: (newRoyale: MovieRoyale) => void; 
        onFailure?: (err: Error) => void; 
      }
    ];

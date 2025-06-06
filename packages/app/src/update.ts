import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { User, MovieRoyale } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/save":
      const savePayload = message[1]; // message[1] is already SaveProfilePayload
      saveProfile(savePayload, user)
        .then((profile) =>
          apply((model) => ({ ...model, profile }))
        )
        .then(() => {
          if (savePayload.onSuccess) savePayload.onSuccess();
        })
        .catch((error: Error) => {
          if (savePayload.onFailure) savePayload.onFailure(error);
        });
      break;

    case "profile/select":
      loadProfile(message[1], user).then((profile) => // Using loadProfile
        apply((model) => ({ ...model, profile }))
      );
      break;

    case "user/select":
      loadProfile(message[1], user).then((u) =>
        apply((model) => ({ ...model, user: u }))
      );
      break;

    case "profile/addFavoriteMovie":
      addFavoriteMovie(message[1], user)
        .then((updatedProfile) => {
          if (updatedProfile) {
            apply((model) => ({ ...model, profile: updatedProfile }));
            console.log("Favorite movie added successfully:", updatedProfile);
          } else {
            console.error("Failed to add favorite movie.");
          }
        })
        .catch((error) => console.error("Error adding favorite movie:", error));
      break;

    case "profile/removeFavoriteMovie":
      removeFavoriteMovie(message[1], user)
        .then((updatedProfile) => {
          if (updatedProfile) {
            apply((model) => ({ ...model, profile: updatedProfile }));
            console.log("Favorite movie removed successfully:", updatedProfile);
          } else {
            console.error("Failed to remove favorite movie.");
          }
        })
        .catch((error) => console.error("Error removing favorite movie:", error));
      break;

    case "profile/addFriend":
      addFriend(message[1], user)
        .then((updatedProfile) => {
          if (updatedProfile) {
            apply((model) => ({ ...model, profile: updatedProfile }));
            console.log("Friend added successfully:", updatedProfile);
          } else {
            console.error("Failed to add friend.");
          }
        })
        .catch((error) => console.error("Error adding friend:", error));
      break;

    case "profile/removeFriend":
      removeFriend(message[1], user)
        .then((updatedProfile) => {
          if (updatedProfile) {
            apply((model) => ({ ...model, profile: updatedProfile }));
            console.log("Friend removed successfully:", updatedProfile);
          } else {
            console.error("Failed to remove friend.");
          }
        })
        .catch((error) => console.error("Error removing friend:", error));
      break;

    case "movieRoyales/create":
      const movieRoyalePayload = message[1];
      createMovieRoyale(movieRoyalePayload, user)
        .then((newRoyale) => {
          console.log("Movie Royale created successfully:", newRoyale);

          if (movieRoyalePayload.creatorId) {
            loadProfile({ userid: movieRoyalePayload.creatorId }, user)
              .then((updatedProfile) => {
                apply((model) => ({ ...model, profile: updatedProfile }));
                console.log("Profile reloaded after new Movie Royale.");
              })
              .catch((err) => console.error("Failed to reload profile after Movie Royale creation:", err));
          }

          movieRoyalePayload.onSuccess?.(newRoyale);
        })
        .catch((error: Error) => {
          console.error("Error creating Movie Royale:", error);
          movieRoyalePayload.onFailure?.(error);
        });
      break;

    // --- ADD THE MISSING CASES HERE ---
    case "movieRoyales/join":
      // message[1] is { royaleId: string; userId: string; onSuccess?: () => void; onFailure?: (err: Error) => void; }
      console.log("Handling movieRoyales/join:", message[1]);
      // Implement joinMovieRoyale logic here, e.g.:
      // joinMovieRoyale(message[1], user)
      //   .then(() => message[1].onSuccess?.())
      //   .catch(err => message[1].onFailure?.(err));
      break;

    case "movieRoyales/startRound":
      // message[1] is { royaleId: string; creatorId: string; movieIds: string[]; onSuccess?: (newRound: MovieRound) => void; onFailure?: (err: Error) => void; }
      console.log("Handling movieRoyales/startRound:", message[1]);
      // Implement startRound logic here
      break;

    case "movieRoyales/submitVote":
      // message[1] is { royaleId: string; roundId: string; userId: string; votes: { movieId: string; score: number; }[]; onSuccess?: () => void; onFailure?: (err: Error) => void; }
      console.log("Handling movieRoyales/submitVote:", message[1]);
      // Implement submitVote logic here
      break;

    case "movies/search":
      // message[1] is { query: string; limit?: number; offset?: number; onSuccess?: (movies: Movie[]) => void; onFailure?: (err: Error) => void; }
      console.log("Handling movies/search:", message[1]);
      // Implement movie search logic here
      break;
    // --- END OF MISSING CASES ---

    default:
      // If all cases are handled, this line should now genuinely be unreachable,
      // and TypeScript will confirm that 'message[0]' is of type 'never'.
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}


interface CreateMovieRoyalePayload {
  title: string;
  creatorId: string;
  onSuccess?: (newRoyale: MovieRoyale) => void;
  onFailure?: (err: Error) => void;
}

async function createMovieRoyale(
  payload: CreateMovieRoyalePayload,
  user: Auth.User
): Promise<MovieRoyale> {
  const { title, creatorId } = payload;
  const response = await fetch("/api/movieRoyales/", {
    method: "POST",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, creatorId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Movie Royale: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

interface LoadProfileMessagePayload {
  userid: string;
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
}

function loadProfile( // Renamed from selectProfile to loadProfile for consistency
  payload: LoadProfileMessagePayload,
  user: Auth.User
): Promise<User | undefined> {
  return fetch(`/api/users/${payload.userid}`, {
    headers: Auth.headers(user)
  })
    .then(async (response: Response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        console.warn(`Profile for user ${payload.userid} not found.`);
        return undefined;
      }
      const errorText = await response.text();
      throw new Error(`Failed to load profile: ${response.status} ${response.statusText} - ${errorText}`);
    });
}

interface FavoriteMoviePayload {
  userId: string;
  movieId: string;
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
}

async function addFavoriteMovie(
  payload: FavoriteMoviePayload,
  user: Auth.User
): Promise<User> {
  const response = await fetch(`/api/users/${payload.userId}/favorite-movies`, {
    method: "POST",
    headers: { ...Auth.headers(user), "Content-Type": "application/json" },
    body: JSON.stringify({ movieId: payload.movieId })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add favorite movie: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

async function removeFavoriteMovie(
  payload: FavoriteMoviePayload,
  user: Auth.User
): Promise<User> {
  const response = await fetch(`/api/users/${payload.userId}/favorite-movies/${payload.movieId}`, {
    method: "DELETE",
    headers: Auth.headers(user)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to remove favorite movie: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

interface FriendPayload {
  userId: string;
  friendId: string;
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
}

async function addFriend(
  payload: FriendPayload,
  user: Auth.User
): Promise<User> {
  const response = await fetch(`/api/users/${payload.userId}/friends`, {
    method: "POST",
    headers: { ...Auth.headers(user), "Content-Type": "application/json" },
    body: JSON.stringify({ friendUsername: payload.friendId })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add friend: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

async function removeFriend(
  payload: FriendPayload,
  user: Auth.User
): Promise<User> {
  const response = await fetch(`/api/users/${payload.userId}/friends/${payload.friendId}`, {
    method: "DELETE",
    headers: Auth.headers(user)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to remove friend: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}

interface SaveProfilePayload {
  userid: string;
  profile: Partial<User>;
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
}

async function saveProfile(
  payload: SaveProfilePayload,
  user: Auth.User
): Promise<User | undefined> {
  const response = await fetch(`/api/users/${payload.userid}`, {
    method: "PUT",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload.profile),
  });

  if (response.status === 200) {
    return response.json();
  } else if (response.status === 404) {
    console.warn(`Profile for user ${payload.userid} not found for update.`);
    return undefined;
  } else {
    const errorText = await response.text();
    throw new Error(`Failed to save profile: ${response.status} ${response.statusText} - ${errorText}`);
  }
}
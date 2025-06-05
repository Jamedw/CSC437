import {User} from "server/models";
export interface Model {
  profile?: User;
}

export const init: Model = {};
import { createContext } from "react";
const blogContext = createContext({
  posts: [],
  loggedIn: false,
  authorId: null,
});

export { blogContext };

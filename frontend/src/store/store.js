import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const userStore = (set) => ({
  user: null,
  solvedQ: [],
  userData: (data) => {
    set((state) => ({
      ...state,
      user: data,
    }));
  },
  addQuestions: (data) => {
    set((state) => {
      const alreadySolved = state.solvedQ.includes(data);
      return {
        ...state,
        solvedQ:alreadySolved ? state.solvedQ.filter((id) => id != data) :  [...state.solvedQ, data],
      };
    });
  },
  removeUser: () => {
    set((state) => ({
      ...state,
      user: null,
    }));
  },
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
      partialize: (state)=> ({solvedQ: state.solvedQ}) // for partialize means if want only some things to store
    })
  )
);

export default useUserStore;

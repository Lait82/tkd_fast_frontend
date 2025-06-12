import { create } from 'zustand'


type Tournament = {
  count: number
  inc: () => void
}

type User = {

}

type Store = {
    user: User
    tournament: Tournament
}

const useStore = create<Store>()((set) => ({
  tournament: 1,
  user:
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
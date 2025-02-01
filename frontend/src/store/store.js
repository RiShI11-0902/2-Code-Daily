import {create} from 'zustand'
import {devtools,persist} from 'zustand/middleware'
const userStore = (set) => ({
    user: null,
    solvedQ: [],
    userData: (data) =>{
        set((state)=>({
            ...state,
            user : data
        }))
    },
    addQuestions:(data)=>{
        set((state)=>({
            ...state,
            solvedQ: [...state.solvedQ, data]
        }))
    },
    removeUser:()=>{
        set((state)=>({
            ...state,
            user: null
        }))
    }
})

const useUserStore = create(
    devtools(
        persist(userStore,{
            name: 'user',
            partialize: (state)=> ({solvedQ: state.solvedQ})
        })
    )
)

export default useUserStore
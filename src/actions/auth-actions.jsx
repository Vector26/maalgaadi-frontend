export const setAuth=(state)=>{
    return (
        {
            type:"SET_AUTH",
            isAuth:state
        }
    )
}
export const setUser=(data)=>{
    return (
        {
            type:"SET_USER",
            data:data
        }
    )
}
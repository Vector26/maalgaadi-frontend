export const isDealer=(type)=>{
    return (
        {
            type:"IS_DEALER",
            isDealer:type
        }
    )
}
export const setFeed=(data)=>{
    return (
        {
            type:"SET_FEED",
            feed:data
        }
    )
}
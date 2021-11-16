export const state = () => ({
    departure:null,
    arrival:null,
    departdate:null,
  })
  
export const mutations = {
    setDeparture(state, message){
        state.departure = message;
    }
}

export const actions = {

}
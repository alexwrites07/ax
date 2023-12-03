
const initialState = {
    users: [],
   
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return { ...state, users: action.payload };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
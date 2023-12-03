// src/reducers.js
const initialState = {
    users: [],
    // Other state variables for search, filters, team, etc.
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return { ...state, users: action.payload };
      // Add other cases for handling search, filters, team creation, etc.
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
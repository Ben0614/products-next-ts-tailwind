interface Action {
  type: string;
  payload: {
    index: number;
  };
}

const ChangeCategoryColorReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case "category_active":
      return action.payload;
    case "big_category_active":
      return action.payload;
    default:
      return state;
  }
};

export default ChangeCategoryColorReducer;

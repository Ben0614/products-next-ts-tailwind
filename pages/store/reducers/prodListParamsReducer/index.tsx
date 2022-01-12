interface Action {
  type: string;
  payload: {
    params: { slug: Array<string> };
    nextPage: () => void;
    prevPage: () => void;
  };
}

const ProdListParamsReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case "productList_params_data":
      return action.payload;

    default:
      return state;
  }
};

export default ProdListParamsReducer;

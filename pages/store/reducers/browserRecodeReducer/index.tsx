
interface Action {
  type: string;
  payload: {
    browserRecode: {
      browserRecode: [
        {
          EXP: string;
          Edible_Method: string;
          Location: string;
          MFD: string;
          Name: string;
          brand_company: string;
          categories: string;
          create_at: string;
          image: string;
          images2: string;
          nutrient: string;
          place_origin: string;
          price: number;
          quantity: string;
          sid: number;
          special_offer: string;
        }
      ];
      updateBrowserRecode: () => void;
    };
  };
}

const BrowserRecodeReducer = (state = {}, action: Action) => {
  console.log("action", action.payload);
  switch (action.type) {
    case "browser_recode":
      return action.payload;
    default:
      return state;
  }
};

export default BrowserRecodeReducer;

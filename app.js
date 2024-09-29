

const WHITH_DRAW = "WHITH_DRAW";
const DEPOSITE_DRAW = "DEPOSITE_DRAW";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";


// Actions:
const whithDraw = (amount) => {
    return {
      type: WHITH_DRAW,
      payload: amount,
    };
}

const depositeDraw = (amount) => {
    return {
        type: DEPOSITE_DRAW,
        payload: amount,
    };
}

const addProducts = (product) => {
    return {
      type: ADD_PRODUCT,
      payload: product,
    };
}

const getProducts = (products) => {
    return {
      type: GET_PRODUCTS,
      payload: products,
    };
}

const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    // console.log(data);
    dispatch(getProducts(data));
  };
}

// Reducers:
const BankReducer = (state = 1000, action) => {
   switch (action.type) {
     case WHITH_DRAW:
       return state - action.payload;
       break;
     case DEPOSITE_DRAW:
       return state + action.payload;
       break;
     default:
        return state;
   }
}

const addProductsReducer = (state = [], action) => {
   switch (action.type) {
     case ADD_PRODUCT:
       return [...state, action.payload];
     break;
     case GET_PRODUCTS:
       return [...action.payload];
     break;
     default:
       return state;
   }
}

// Store:
const appReducers = Redux.combineReducers({
  bank: BankReducer,
  products: addProductsReducer,
});

const store = Redux.createStore(appReducers, Redux.applyMiddleware(ReduxThunk));

// store.dispatch(whithDraw(100));
// store.dispatch(depositeDraw(100));
// store.dispatch(addProducts({id: 1, title: "products-1"}));
// store.dispatch(addProducts({id: 2, title: "products-2"}));
// store.dispatch(fetchProducts());
// store.dispatch(addProducts({id: 111, title: "kimo"}));

store.subscribe(() => {
   console.log(store.getState());
});

const tagInput = document.querySelector(".inp_num");
const tagAmout = document.querySelector(".amout");
const btns = document.querySelectorAll("button");
const items = document.querySelector(".items");

// console.log(store.getState());

// tagInput.value = store.getState().bank;
tagAmout.innerText = store.getState().bank;

// tagInput.addEventListener("input", () => {
  //   tagAmout.innerText = tagInput.value;
  //   console.log("Clicked");
  // })
  
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.id === "with_draw") {
        store.dispatch(whithDraw(+tagInput.value));
    } else {
      store.dispatch(depositeDraw(+tagInput.value));
    }

    // tagInput.value = store.getState().bank;
    tagAmout.innerText = store.getState().bank;
  })
})


function getAllProducts() {
  
}

getAllProducts();
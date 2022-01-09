import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../features/cart/cartReducer';
import ExploreReducer from '../features/explore/ExploreReducer';
import authReducer from '../features/Profile/authReducer';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    explore: ExploreReducer,
    auth: authReducer
  },
});


/*The store holds the whole state tree of the application. 
The only way to change the state inside it is to dispatch an action on it. 
To create the store, one has to pass the root reducer fuctions.
In our app we have three reducer functions
- CartReducer - Dealing with the state of the cart
- ExploreReducer - To have check on the items explored by the users. It uses mock backend apis too
- authReducer - To deal with the user and his/her profile state. Update foloowed brands , orders etc*/
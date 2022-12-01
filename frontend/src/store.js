import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'


import {
  storeListReducer,
  // storeDetailsReducer,
  // productDeleteReducer,
  storeCreateReducer,
  // productUpdateReducer,
  // productReviewCreateReducer,
  // productTopRatedReducer,
} from './reducers/storeReducers'


import {
  coralListReducer,
  coralDetailsReducer,
  // productDeleteReducer,
  coralCreateReducer,
  // productUpdateReducer,
  // productReviewCreateReducer,
  // productTopRatedReducer,
} from './reducers/coralReducers'

import {
  coralMultiListReducer,
  coralDeleteReducer,
  coralMultiCreateReducer,
  // productUpdateReducer,
  // productReviewCreateReducer,
  // productTopRatedReducer,
} from './reducers/coralMultiReducers'

import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

import {
  temperatureCreateReducer,
  temperatureDeleteReducer,
  // orderDetailsReducer,
  // orderPayReducer,
  // orderDeliverReducer,
  temperatureListReducer,
  // orderListReducer,
} from './reducers/temperatureReducers'



const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  //added
  storeList: storeListReducer,

  storeCreate: storeCreateReducer,

  coralList: coralListReducer,
  coralCreate: coralCreateReducer,
  coralDetails: coralDetailsReducer,

  coralMultiList: coralMultiListReducer,
  coralDelete: coralDeleteReducer,
  coralMultiCreate: coralMultiCreateReducer,
  
  temperatureList: temperatureListReducer,
  temperatureCreate  : temperatureCreateReducer,
  temperatureDelete: temperatureDeleteReducer,

  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

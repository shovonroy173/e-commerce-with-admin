import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
import { publicRequest, userRequest } from ".././requestMethods";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
export const login = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart);
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  getProductStart();
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductStart(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const deleteProduct = async (dispatch, id) => {
  deleteProductStart();
  try {
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, id, product) => {
  updateProductStart();
  try {
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  addProductStart();
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

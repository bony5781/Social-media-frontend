import { axiosInstance } from './config';

export const loginCall = async(userCredential, dispatch) => {
    dispatch({type: "LOGIN_START "});
    try{    
        const res = await axiosInstance.post("auth/login", userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err})
        alert("Login Failed! Check your password and try again!")
    }
}

export const logoutCall = async (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
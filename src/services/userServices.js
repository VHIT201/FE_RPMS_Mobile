import axios from '../config/axiosConfig'
import { setUserRoom } from "../store/userSlice";
import { setUser } from "../store/userSlice";


import { setLoading } from '../store/stateSlice';

export const getUserInformation = async (username, dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`/identityusers/information?username=${username}`);
        dispatch(setUser( {userInfo : response.data.data}))
        dispatch(setLoading(false));
        return response.data.data
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};


export const getAllRoomByUserId = async (userId, dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`/room/getallroombyuseridmb?id=${userId}`);
        dispatch(setUserRoom(response.data.data)); 
        return response.data
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};

export const updateAvata = async ( userid, avata ) => {
    try {
        const response = await axios.put(`/identityusers/updateavata?id=${userid}&avata=${avata}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
export const getCustomerByUserId = async ( userId ) => {
    try {
        const response = await axios.get(`/customer/getcustomerbyuserid?id=${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateCustomer = async ( userId, data ) => {
    try {
        const response = await axios.put(`/customer/update?id=${userId}`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const changePassword = async (username, oldPassword, newPassword ) => {
    try {
        const data = { 
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword
         }
        const response = await axios.post(`/identityusers/changepassword`,data) 
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getContractByUserId = async ( userId ) => {
    try {
        const reponse = await axios.get(`/contract/getcontractbyuserid?id=${userId}`)
        return reponse.data
    } catch (error) {
        console.log(error)
    }
}

export const getContractById = async ( contractId ) => {
    try {
        const response = await axios.get(`/contract/download-pdf/${contractId}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}
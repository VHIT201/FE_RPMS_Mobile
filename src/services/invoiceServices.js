import axios from "../config/axiosConfig";
import { setLoading, setError } from "../store/stateSlice";
import { setListInvoices,  } from "../store/invoiceSlice";
export const getAllRoomByUserId = async ( userId ) => {
    try {
        const response = await axios.get(`/room/getallroombyuseridmb?id=${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
} 

export const getBillByRoomId = async ( dispatch, roomId ) => {
    try {
        const response = await axios.get(`bill/getbillbyroomid?id=${roomId}`)
        dispatch(setListInvoices({ listInvoices: response.data.data }));
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const createPayment = async ( billId ) => {
    try {
        const response = await axios.post(`/bill/createpayment?billId=${billId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
} 


export const updatePaymentStatus = async ( billId ) => {
    try {
        const response = await axios.put(`/bill/updatepaymentstatus?id=${billId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
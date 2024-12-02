import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    listInvoices: [], // Mảng chứa danh sách hóa đơn
    selectedInvoice: null, // Hóa đơn được chọn
    loading: false,
    error: null,
  },
  reducers: {
    setListInvoices(state, action) {
      state.listInvoices = action.payload.listInvoices;
    },
    setSelectedInvoice(state, action) {
      state.selectedInvoice = action.payload.invoice;
    },
    addInvoice(state, action) {
      state.listInvoices.push(action.payload.invoice);
    },
    updateInvoice(state, action) {
      const index = state.listInvoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state.listInvoices[index] = {
          ...state.listInvoices[index],
          ...action.payload.data,
        };
      }
    },
    removeInvoice(state, action) {
      state.listInvoices = state.listInvoices.filter(
        (invoice) => invoice.id !== action.payload.id
      );
    },
    clearInvoices(state) {
      state.listInvoices = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setListInvoices,
  setSelectedInvoice,
  addInvoice,
  updateInvoice,
  removeInvoice,
  clearInvoices,
  setLoading,
  setError,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

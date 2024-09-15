// customerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiCall from '@/lib/axios'; // Adjust this to your correct path

// Define initial state
interface CustomerState {
  customers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// Async thunk for fetching customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await apiCall('GET', '/customers');
  return response; // Assuming the API response is an array of customers
});

// Async thunk for deleting a customer
export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (customerId: string, { dispatch }) => {
    await apiCall('DELETE', `/customers/${customerId}`);
    dispatch(fetchCustomers()); // Re-fetch customers after deletion
    return customerId;
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch customers';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer.customer_id !== action.payload
        );
      });
  },
});

export default customerSlice.reducer;

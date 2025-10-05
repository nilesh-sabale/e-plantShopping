import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) =>
    {
      const {name,image,cost} = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if(existingItem)
        {
          existingItem.quantity++;
        }
      else
      {
        state.items.push({name, image, cost, quantity: 1});
      }
    },
    removeItem: (state, action) =>
    {
      const {name,image,cost} = action.payload;
      const itemToRemove = state.items.find(item => item.name === name);
      if(itemToRemove)
        {
          state.items = state.items.filter(item => item.name !== name)
        }
      
    },
    updateQuantity: (state, action) =>
    {
      const {name, quantity} = action.payload;
      //console.log("Received the action object...");
      //console.log("Name:", name, "Type:", typeof name);
      //console.log("Quantity:", parseInt({quantity}), "Type:", typeof quantity);
      const itemToUpdate = state.items.find(item => item.name === name);
      //console.log("Checking the itemToUpdate...", typeof itemToUpdate);
      if(itemToUpdate)
        {
          itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
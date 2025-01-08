import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Inicializa los artículos como un array vacío
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++; // Incrementa la cantidad si el artículo ya existe
      } else {
        state.items.push({ name, image, cost, quantity: 1 }); // Agrega un nuevo artículo con cantidad inicial 1
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      // Filtra los artículos para eliminar el que coincide con el nombre recibido en el payload
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Actualiza la cantidad si el artículo existe
      }
    },
  },
});

export const selectTotalItemTypes = (state) => state.cart.items.length;
// Exporta las acciones generadas automáticamente

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exporta el reductor para su uso en el store
export default CartSlice.reducer;


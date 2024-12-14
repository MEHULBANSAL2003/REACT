import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
    },
    reducers:{
        addItem:(state,action)=>{
         if(state.items.length===0 || state.items[0].card.restroId===action.payload.card.restroId){
                state.items.push(action.payload);
         }
        else{
            const confirmClear = window.confirm("Items from different restaurant are already added.Are you sure you want to clear the cart?");
            if(confirmClear){
                state.items.length=0;
                state.items.push(action.payload);
            }

        }
       

        },
        removeItem: (state, action) => {
            const menuId = action.payload.card.info.id;
          
            // Find the index of the first occurrence of the item
            const index = state.items.findIndex((item) => item.card.info.id === menuId);
          
            // If an item with the given menuId is found, remove it
            if (index !== -1) {
              state.items.splice(index, 1); // Remove one item at the found index
            }
          },
          
        clearCart:(state,action)=>{
            state.items.length=0;
        }
    }
});

export const {addItem,removeItem,clearCart}=cartSlice.actions;

export default cartSlice.reducer;
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
        removeItem:(state,action)=>{
            state.items.pop();
        },
        clearCart:(state,action)=>{
            state.items.length=0;
        }
    }
});

export const {addItem,removeItem,clearCart}=cartSlice.actions;

export default cartSlice.reducer;
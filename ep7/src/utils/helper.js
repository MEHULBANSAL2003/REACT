
export let filter_res=(searchText,listOfRestraunts)=>{
     
    let filtered_res= listOfRestraunts.filter((res)=>{
       return res.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    })

    return filtered_res;

}
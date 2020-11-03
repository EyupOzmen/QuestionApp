export  const findIndex = (arr, item) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === item.ID) {
        return i;
      }
    }
  };

export const deleteItem = (arr, item) => {
    let newArr = arr.filter((arrItem) => arrItem !== item);

    return newArr;
  };

export  const validation = (options,currentIndex) => {
    console.log('Validate');
    
    if(options.length !==0){
      console.log('Entered if')
      let validatedID = options[options.length - 1][options.length - 1].ID.toString().substring(
        0,
        options[options.length - 1][options.length - 1].ID.length-1
      );
      console.log(validatedID)
      console.log((currentIndex + 1).toString())
      if (validatedID === (currentIndex + 1).toString()) {
        return true;
      } else {
        return false;
      }
    }else{
      console.log('Entered else')
      return false;
    }
    
  };
const toUpper = (name) => {
  return name.toUpperCase();
};

export function transferGetItems(reducerName, list, filteredList) {
  return {
    type: `TRANSFER_GET_ITEMS_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      list,
      filteredList
    }
  };
}

export function transferSelectItem(reducerName, addItems, removeItems, list, filteredList) {
  return {
    type: `TRANSFER_SELECT_ITEM_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      addItems,
      removeItems,
      list,
      filteredList
    }
  };
}

export function transferAddItems(reducerName, list, filteredList) {
  return {
    type: `TRANSFER_ADD_ITEMS_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      list,
      filteredList
    }
  };
}

export function transferRemoveItems(reducerName, list, filteredList) {
  return {
    type: `TRANSFER_REMOVE_ITEMS_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      list,
      filteredList
    }
  };
}

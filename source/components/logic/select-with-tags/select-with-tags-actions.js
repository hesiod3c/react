const toUpper = (name) => {
  return name.toUpperCase();
};

export function selectWithTagsGetItems(reducerName, items) {
  return {
    type: `SELECT_WITH_TAGS_GET_ITEMS_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      items
    }
  };
}

export function selectWithTagsAddItem(reducerName, items) {
  return {
    type: `SELECT_WITH_TAGS_ADD_ITEM_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      items
    }
  };
}

export function selectWithTagsRemoveItem(reducerName, items) {
  return {
    type: `SELECT_WITH_TAGS_REMOVE_ITEM_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      items
    }
  };
}



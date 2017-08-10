const toUpper = (name) => {
  return name.toUpperCase();
};

export function autosuggestWithTagsGetItems(reducerName, items) {
  return {
    type: `AUTOSUGGEST_WITH_TAGS_GET_ITEMS_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      items
    }
  };
}

export function autosuggestWithTagsAddItem(reducerName, items) {
  return {
    type: `AUTOSUGGEST_WITH_TAGS_ADD_ITEM_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      items
    }
  };
}

export function autosuggestWithTagsGetField(reducerName, value) {
  return {
    type: `AUTOSUGGEST_WITH_TAGS_GET_FIELD_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      value
    }
  };
}

export function autosuggestWithTagsRemoveItem(reducerName, items) {
  return {
    type: `AUTOSUGGEST_WITH_TAGS_REMOVE_ITEM_OF_${toUpper(reducerName)}`,
    payload: {
      reducerName,
      items
    }
  };
}



const GET_USER = gql`
  query getUser($_id: String!) {
    getUser(_id: $_id) {
      _id
      emailID
      name
      password
      dob
      gender
      profilePicture
      country
      city
      address
      about
      phoneNumber
      currencyID
      shopName
      userDefinedCategories
      cart
      favourites
    }
  }
`;

const GET_FAVOURITES = gql`
  query getFavourites {
    getFavourites {
      _id
      userId
      itemId
    }
  }
`;

const GET_ITEMS = gql`
  query getItems {
    getItems {
      _id
      name
      displayPicture
      price
      category
      description
      quantity
      salesCount
      userID
    }
  }
`;

const GET_ITEM = gql`
  query getItem($_id: String!) {
    getItem(_id: $_id) {
      _id
      name
      description
      price
      image
      category
      quantity
    }
  }
`;


const GET_CART = gql`
  query getCart {
    getCart {
      _id
      userId
      itemId
    }
  }
`;

const GET_CART_ITEM = gql`
  query getCartItem($_id: String!) {
    getCartItem(_id: $_id) {
      _id
      userId
      itemId
    }
  }
`;

const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      userID
      itemID
    }
  }
`;

const GET_ORDER = gql`
  query getOrderItem($_id: String!) {
    getOrderItem(_id: $_id) {
        itemID
        quantity
        isGiftPack
        instructions
    }
  }
`;

export {
  GET_USER,
  GET_FAVOURITES,
  GET_ITEMS,
  GET_ITEM,
  GET_CART,
  GET_CART_ITEM,
  GET_ORDERS,
  GET_ORDER,
};

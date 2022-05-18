const NEW_USER = gql`
  mutation newUser($name: String!, $emailIDID: String!, $password: String!) {
    newUser(name: $name, emailIDID: $emailIDID, password: $password) {
      name
      emailIDID
      password
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $name: String
    $password: String
    $emailID: String
    $profilePicture: String
    $country: String
    $city: String
    $address: String
    $dob: String
    $phone: String
  ) {
    updateUser(
      _id: $_id
      name: $name
      password: $password
      emailID: $emailID
      profilePicture: $profilePicture
      address: $address
      country: $country
      city: $city
      state: $state
      phone: $phone
    ) {
      _id
      name
      password
      emailID
      profilePicture
      address
      country
      city
      state
      phone
    }
  }
`;

const ADD_FAVOURITE = gql`
  mutation addFavourite($userID: String!, $itemID: String!) {
    addFavourite(userID: $userID, itemID: $itemID) {
      userID
      itemID
    }
  }
`;

const ADD_ITEM = gql`
  mutation addItem(
    $name: String!
    $displayPicture: String!
    $category: String!
    $description: String!
    $price: Float!
    $quantity: Int!
    $salesCount: Int!
    $userID: Int!
  ) {
    addItem(
      name: $name
      description: $description
      price: $price
      displayPicture: $displayPicture
      category: $category
      quantity: $quantity
      salesCount: $salesCount
      userID: $userID
    ) {
      name
      description
      price
      displayPicture
      category
      quantity
      salesCount
      userID
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem(
    $_id: String!
    $name: String
    $description: String
    $price: Float
    $displayPicture: String
    $category: String
    $quantity: Int
  ) {
    updateItem(
      _id: $_id
      name: $name
      description: $description
      price: $price
      displayPicture: $displayPicture
      category: $category
      quantity: $quantity
    ) {
      _id
      name
      description
      price
      displayPicture
      category
      quantity
    }
  }
`;

const ADD_CART = gql`
  mutation addCart($userID: String!, $itemID: String!) {
    addCart(userID: $userID, itemID: $itemID) {
      userID
      itemID
    }
  }
`;

const ADD_ORDER = gql`
  mutation addPurchased($userID: String!, $itemID: String!) {
    addPurchased(userID: $userID, itemID: $itemID) {
      userID
      itemID
    }
  }
`;

const REMOVE_FAVOURITE = gql`
  mutation updateFavourite($_id: String!, $userID: String, $itemID: String) {
    updateFavourite(_id: $_id, userID: $userID, itemID: $itemID) {
      _id
      userID
      itemID
    }
  }
`;

const REMOVE_CARTITEM = gql`
  mutation updateCart($_id: String!, $userID: String, $itemID: String) {
    updateCart(_id: $_id, userID: $userID, itemID: $itemID) {
      _id
      userID
      itemID
    }
  }
`;

export {
  NEW_USER,
  UPDATE_USER,
  ADD_FAVOURITE,
  ADD_ITEM,
  UPDATE_ITEM,
  ADD_CART,
  ADD_ORDER,
  REMOVE_FAVOURITE,
  REMOVE_CARTITEM,
};

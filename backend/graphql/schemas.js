const graphql = require("graphql");
const USERMODEL = require("../models/userModel");
const USER = require("../services/userService");
const Item = require("../services/itemService");
const encrypt = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const constants = require("../constants.json");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    salesCount: { type: GraphQLInt },
    userID: { type: UserType },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    _id: { type: GraphQLID },
    userID: { type: GraphQLID },
    name: { type: GraphQLString },
    emailID: { type: GraphQLString },
    password: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    country: { type: GraphQLString },
    currencyID: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    dob: { type: GraphQLString },
    gender: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    userDefinedCategories: { type: GraphQLList },
    cart: { type: GraphQLList },
    favourites: { type: GraphQLList },
  }),
});

const ConstantsType = new GraphQLObjectType({
  name: "Constants",
  fields: () => ({
    _id: { type: GraphQLID },
    countries: { type: GraphQLList },
    categories: { type: GraphQLList },
    currencies: { type: GraphQLList },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const result = await USER.getUserById(args);
        console.log(result);
        return result.user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    items: {
      type: new GraphQLList(ConstantsType),
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const itemsResult = await Item.getOtherItems(args);
        console.log(itemsResult);
        return itemsResult;
      },
    },
    createuser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        emailID: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        console.log("REGISTERING USER", args);

        const { name, emailID, password } = args;
        const newUser = { name, emailID, password };
        if (newUser.name && newUser.emailID && newUser.password) {
          try {
            const exists = await USERMODEL.findOne({ emailID });
            if (exists) {
              console.log("USER EXISTS");
              return "User already exisits";
            }
            const encryptedPassword = await encrypt.cryptPassword(password);
            newUser.password = encryptedPassword;
            const result = await new USERMODEL(newUser).save();
            console.log(result);
            delete newUser.password;
            // Create token
            const token = jwt.sign(newUser, constants.jwtPrivateKey, {
              expiresIn: "24h",
            });
            newUser.token = token;
            newUser._id = result._id;
            newUser.id = result._id;

            return newUser;
          } catch (e) {
            console.error(e);
            return {};
          }
        } else {
          return {};
        }
      },
    },
    updateuser: {
      type: UserType,
      args: {
        userID: { type: GraphQLString },
        name: { type: GraphQLString },
        emailID: { type: GraphQLString },
        password: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
        country: { type: GraphQLString },
        currency: { type: GraphQLString },
        about: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        date: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
        token: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        console.log("UPDATING USER", args);
        const {
          userID,
          name,
          emailID,
          password,
          profilePicture,
          country,
          currency,
          about,
          address,
          city,
          date,
          gender,
          phone,
          token,
        } = args;
        const result = await USERMODEL.findByIdAndUpdate(userID, {
          userID,
          name,
          emailID,
          password,
          profilePicture,
          country,
          currency,
          about,
          address,
          city,
          date,
          gender,
          phone,
          token,
        });
        console.log("AFTER UPDATE", result);
        return result;
      },
    },
    additem: {
      type: ItemType,
      args: {
        name: { type: GraphQLString },
        displayPicture: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        quantity: { type: GraphQLString },
        salesCount: { type: GraphQLString },
        shop: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        console.log("ADDING USER", args);
        const {
          name,
          displayPicture,
          category,
          description,
          price,
          quantity,
          salesCount,
          shop,
        } = args;
        const newItem = new ITEMMODEL({
          name,
          displayPicture,
          category,
          description,
          price,
          quantity,
          salesCount,
          shop,
        });
        const result = await newItem.save();
        console.log("AFTER CREATING", result);
        return result;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;

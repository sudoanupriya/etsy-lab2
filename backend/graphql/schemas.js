const graphql = require('graphql');
const REGISTERUSER = require('../services/registerService');
const USER = require('../services/userService');
const Item = require('../services/itemService');
const encrypt = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const constants =  require("../constants.json");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;


const ShopType = new GraphQLObjectType({
    name: 'Shop',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        owner: { type: UserType },
        displayPicture: { type: GraphQLString },
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        displayPicture: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: {type: GraphQLInt},
        salesCount: { type:GraphQLInt},
        shop: { type:ShopType }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        emailID: { type: GraphQLString },
        password: { type: GraphQLString },
        profilePicture: { type: GraphQLString },
        country: { type: GraphQLString },
        currency: { type: GraphQLString },
        about: {type: GraphQLString },
        address : { type:GraphQLString},
        city: { type:GraphQLString },
        date: { type: GraphQLString},
        gender: { type:GraphQLString },
        phone: { type:GraphQLString },
        token: { type:GraphQLString },
    })
});

const ConstantsType = new GraphQLObjectType({
    name: 'Constants',
    fields: () => ({
        _id: { type: GraphQLID },
        countries: { type: GraphQLList },
        categories: { type: GraphQLList },
        currencies: { type: GraphQLList }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        user : {
            type: UserType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await USER.getUserById(args);
                console.log(result);
                return result.user;
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        items: {
            type: new GraphQLList(ItemType),
            args: {
                id: { type: GraphQLID },
            },
            resolve: async (parent, args) => {
                const itemsResult = await Item.getOtherItems(args);
                console.log(itemsResult);
                return itemsResult;
            }
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

                const {name,emailID,password} = args;
                const newUser = {name,emailID,password};
                if(newUser.name && newUser.emailID && newUser.password){
                    try{
                        const isUnique = await REGISTERUSER.checkIfTheUserIsUnique(emailID);
                        if(!isUnique){
                            console.log("USER EXISTS", exists);
                            return {};
                        }
                        const encryptedPassword = await encrypt.cryptPassword(password);
                        newUser.password = encryptedPassword;
                        const result = await REGISTERUSER.createUser(newUser);
                        delete newUser.password;
                        // Create token
                        const token = jwt.sign(
                            newUser,
                            constants.jwtPrivateKey,
                            {
                                expiresIn: "24h",
                            }
                        );
                        newUser.token = token;
                        newUser._id = result._id;
                        newUser.id = result._id;
                        console.log(newUser);
                        return newUser;
                    }catch(e){
                        console.error(e);
                        return {};
                    }
                }else{
                    return {};
                }
            }
        }


    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;
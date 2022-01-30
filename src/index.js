const {ApolloServer, gql} = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');

// type checking
// query vs mutation
// objects
// arrays
// arguments

// crud

const typeDefs = gql`
	type Query {
		hello(name: String): String,
		user: User
	}

	type User {
		id: ID!,
		username: String,
		firstLetterOfUsername: String
	}

	type Error {
		field: String!,
		message: String!
	}

	type RegisterResponse {
		errors: [Error!]!
		user: User!
	}

	input UserInfo {
		username: String!,
		password: String!,
		age: Int
	}

	type Mutation {
		register(userInfo: UserInfo): RegisterResponse!
		login(userInfo: UserInfo): String!
	}

	type Subscription {
		newUser: User!
	}
`;

const NEW_USER = 'NEW_USER';

const resolvers = {
	Subscription: {
		newUser: {
			subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(NEW_USER)
		}
	},
	User: { // This oveerides Username field in user type
		// username: (parent) => parent.user.username
		firstLetterOfUsername: (parent) => {
			return parent.username ? parent.username[0] : null;
		},
	},
	Query: {
		hello: (parent, {name}) => {
			return 'Hello ' + name;
		},
		user: () => ({
			id:1,
			username: 'Bob'
		})
	},
	Mutation: {
		register: (_, {userInfo: {username}}, {pubsub}) => {
			const user = {
				id: 1,
				username
			};

			pubsub.publish(NEW_USER, {
				newUser: user
			});

			return {
				errors: [
					{
						field: 'username',
						message: 'Username already taken'
					},
					{
						field: 'username2',
						message: 'Username2 already taken'
					}
				],
				user
			};
		},
		// login: (parent, args, context, info) => {
		// resolvers can be async
		login: async (parent, {userInfo: {username}}, context, info) => {
			// check password
			// await checkPassword(password)
			return username
		}
	}
};

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req, res}) => ({req, res, pubsub})
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
const {ApolloServer, gql} = require('apollo-server');

// type checking
// query vs mutation
// objects
// arrays
// arguments

// crud

const typeDefs = gql`
	type Query {
		hello: String!
	}

	type User {
		id: ID!,
		username: String!
	}

	type Error {
		field: String!,
		message: String!
	}

	type RegisterResponse {
		errors: [Error]
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
`;

const resolvers = {
	Query: {
		hello: () => 'Hello world!'
	},
	Mutation: {
		register: () => ({
			errors: [{
				field: 'username',
				message: 'Username already taken'
			}],
			user: {
				id: '1',
				username: 'bob'
			}
		}),
		// login: (parent, args, context, info) => {
		login: (parent, {userInfo: {username}}, context, info) => {
			return username
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
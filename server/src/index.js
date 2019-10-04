import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import db from './db'

const options = { port: 4004 }

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})	

db.connection.once("open", () => {
	server
		.start(options, () =>
			console.log(`Server is running ⚡ on localhost:${options.port}`),
		)	
		.catch(err => console.error('connection Error', err))	
})


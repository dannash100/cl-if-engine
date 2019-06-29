
import { GraphQLServer } from 'graphql-yoga'
import { default as typeDefs } from './typeDefs'
import { default as resolvers } from './resolvers'
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/IE', {useNewUrlParser: true})


const options = { port: 4004 }

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})	

server
  .start(options, () =>
    console.log(`Server is running ⚡ on localhost:${options.port}`),
  )	
  .catch(err => console.error('connection Error', err))	


const Game = mongoose.model('Game', {
	name: String,
	description: String,
	author: String
})
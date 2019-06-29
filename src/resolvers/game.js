export default {
  Query: {
    getGames: () => Game.find(),
    getGame: async (_, {id}) => {
      const result = await Game.findById(id)
      return result
    }
  },
  Mutation: {
    addGame: async (_, {name, description, author}) => {
      const game = new Game({name, description, author})
      await game.save()
      return game
    },
    deleteGame: async (_, {id}) => {
      await Game.findByIdAndRemove(id)
      return "Game deleted"
    }
  }
}
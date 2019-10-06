import Game from '../db/models/game'

export default {
  Query: {
    getGames: () => Game.find().populate('scenes'),
    getGame: async (_, {id}) => {
      const result = await Game.findById(id);
      return result
    }
  },
  Mutation: {
    addGame: async (_, {input}) => {
      const game = new Game(input);
      await game.save();
      return game
    },
    updateGame: async (_, {id, input}) => {
      // Try $set if not work
      const result = await Game.findOneAndUpdate(
        {_id: id},
        input,
        {new: true}
      )
      .save();
      return result
    },
    deleteGame: async (_, {id}) => {
      await Game.findByIdAndRemove(id);
      return "Game deleted"
    }
  }
}
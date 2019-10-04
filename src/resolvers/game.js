export default {
  Query: {
    Games: () => Game.find(),
    Game: async (_, {id}) => {
      const result = await Game.findById(id);
      return result;
    }
  },
  Mutation: {
    addGame: async (_, {name, description, author}) => {
      const game = new Game({name, description, author});
      await game.save();
      return game;
    },
    updateGame: async (_, {id, name, description, author}) => {
      // Try $set if not work
      const result = await Game.findOneAndUpdate(
        {_id: id},
        {name, description, author},
        {new: true}
      );
      return result
    },
    deleteGame: async (_, {id}) => {
      await Game.findByIdAndRemove(id);
      return "Game deleted";
    }
  }
};

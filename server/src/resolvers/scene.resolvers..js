import Scene from '../db/models/scene'
import Game from '../db/models/game'

export default {
  Query: {
    getScenes: () => Scene.find()
  },
  Mutation: {
    addScene: async (_, {input}) => {
      const scene = await new Scene(input).save()
      const result = await Game.findOneAndUpdate(
        { _id: input.gameId }, 
        { $push: { scenes: scene } }
      )
      return scene
    }
  }
}
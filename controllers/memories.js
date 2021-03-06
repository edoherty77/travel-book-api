const db = require("../models")

const index = async (req, res) => {
  // let memories = []
  try {
    // const foundUser = await db.User.findOne({
    //   googleId: req.params.userId,
    // }).populate('trips', 'memories')
    // foundUser.trips.forEach((trip) => {
    //   memories = trip.populate('memories')
    // })
    // console.log(memories)
    // console.log(foundUser)
    const foundMemories = await db.Memory.find({ userId: req.params.id })
    if (!foundMemories.length)
      return await res.json({
        message: "No memories found",
      })
    await res.json({ memories: foundMemories })
  } catch (error) {
    console.log(error)
  }
}

const create = async (req, res) => {
  try {
    const data = await JSON.parse(req.body.body)
    const createdMemory = await db.Memory.create(data.memory)
    const foundTrip = await db.Trip.findOne({ name: data.tripName })
    foundTrip.memories.push(createdMemory)
    foundTrip.save()
    createdMemory.save()
    await res.json(createdMemory)
  } catch (error) {
    console.log(error)
  }
}

// const update = async (req, res) => {
// try {
//     const updatedPost = await db.Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     if (!updatedPost) return await res.json({
//         message: 'No post with that ID'
//     })
//     await updatedPost.save()
//     await res.json({post: updatedPost})
// } catch (error) {
//     console.log(error)
// }
// }

const show = async (req, res) => {
  try {
    const foundMemory = await db.Memory.findById(req.params.id)
    console.log(foundMemory)
    if (!foundMemory)
      return await res.json({
        message: "No post with that ID",
      })
    await res.json(foundMemory)
  } catch (error) {
    console.log(error)
  }
}

const destroy = async (req, res) => {
  console.log("req.params:", req.params)
  try {
    const deletedMemory = await db.Memory.findByIdAndDelete(req.params.id)

    if (!deletedMemory)
      return res.json({
        message: "No memory with that ID",
      })

    const foundTrip = await db.Trip.findOne({
      memories: deletedMemory._id,
    })
    if (foundTrip) {
      console.log("deleting MEMORY from TRIP:", foundTrip.name) // TODO: remove
      await foundTrip.memories.remove(deletedMemory)
      await foundTrip.save()
    }

    await res.json({ memory: deletedMemory })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  index,
  show,
  create,
  destroy,
}

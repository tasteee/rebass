import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGO_CONNECTION_URL

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
// during API Route usage.

export const connection = (async () => {
  const cached = !global.mongoose
    ? (global.mongoose = { conn: null, promise: null })
    : global.mongoose

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
})()

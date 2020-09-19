const { Schema, model } = require('mongoose')

const fileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'files',
  }
)

module.exports = model('File', fileSchema)

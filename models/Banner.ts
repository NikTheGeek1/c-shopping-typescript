import mongoose from 'mongoose'
import basePlugin from './base_model'

const BannerSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
BannerSchema.plugin(basePlugin)
/**
 * Alternative approach that complies with typescript
 BannerSchema.post(/^find/, function (docs) {
  if (Array.isArray(docs)) {
    // Handle 'find' operations
    docs.forEach(doc => {
      doc._id = doc._id.toString()
      doc.category_id = doc.category_id.toString()
    })
  } else if (docs) {
    // Handle 'findOne' operations
    docs._id = docs._id.toString()
    docs.category_id = docs.category_id.toString()
  }
})
 */
BannerSchema.post(/^find/, function (docs) {
  //@ts-ignore
  if (this.op === 'find') {
    docs.forEach((doc: any) => {
      doc._id = doc._id.toString()
      doc.category_id = doc.category_id.toString()
    })
  }
  //@ts-ignore
  if (this.op === 'findOne' && docs) {
    docs._id = docs._id.toString()
    docs.category_id = docs.category_id.toString()
  }
})
const Banner = mongoose.models.banner || mongoose.model('banner', BannerSchema)

export default Banner

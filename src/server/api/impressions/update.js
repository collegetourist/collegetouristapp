import ImpressionSerializer from '../../serializers/impression_serializer'
import Impression from '../../models/impression'

const route = async (req, res) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx,
    withRelated: ['asset', 'user.photo']
  })

  await impression.save({
    text: req.body.text
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}

export default route

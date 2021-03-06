import SessionSerializer from '../../serializers/session_serializer'

const route = async (req, res) => {

  await req.user.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    transacting: req.trx,
    patch: true
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}

export default route

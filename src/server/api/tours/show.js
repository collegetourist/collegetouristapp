import TourSerializer from '../../serializers/tour_serializer'
import Tour from '../../models/tour'

const route = async (req, res) => {

  const tour = await Tour.query(qb => {
    qb.innerJoin('tourists', 'tourists.tour_id', 'tours.id')
    qb.where('tourists.user_id', req.user.get('id'))
    qb.where('tours.id', req.params.id)
  }).fetch({
    transacting: req.trx,
    withRelated: ['owner.photo']
  })

  if(!tour) return res.status(404).json({
    message: 'Not Found'
  })

  res.status(200).json({
    data: TourSerializer(tour)
  })

}

export default route

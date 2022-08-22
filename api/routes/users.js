import express from 'express'
import { fetchDestinationDetails, fetchPlaces, search,fetchPlaceDetails } from '../controllers/user.js'
const router = express.Router()

router.get('/destinations/',search)
router.get('/destination/:id',fetchDestinationDetails)
router.get('/places',fetchPlaces)
router.get('/placeDetails/:id',fetchPlaceDetails)

export default router

import express from 'express';
import * as TripController from '../controllers/trip.controller.js';

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: API endpoints for managing trips
 */

const router = express.Router();

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'back/src/models/trip.model.js'
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Bad request
 */
router.post('/trips', TripController.createTrip);

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of trips
 *       400:
 *         description: Bad request
 */
router.get('/trips', TripController.getAllTrips);

/**
 * @swagger
 * /api/trips/{tripId}:
 *   get:
 *     summary: Get a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the trip to fetch
 *     responses:
 *       200:
 *         description: Trip data
 *       404:
 *         description: Trip not found
 *       400:
 *         description: Bad request
 */
router.get('/trips/:tripId', TripController.getTrip);

/**
 * @swagger
 * /api/trips/{tripId}:
 *   put:
 *     summary: Update a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'back/src/models/trip.model.js'
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *       404:
 *         description: Trip not found
 *       400:
 *         description: Bad request
 */
router.put('/trips/:tripId', TripController.updateTrip);

/**
 * @swagger
 * /api/trips:
 *   delete:
 *     summary: Delete a trip by ID
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: string
 *                 example: "660c0e45ec293292e4c2c123"
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       404:
 *         description: Trip not found
 *       400:
 *         description: Bad request
 */
router.delete('/trips', TripController.deleteTrip);

export default router;

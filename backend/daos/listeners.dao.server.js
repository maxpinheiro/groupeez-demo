const listenersModel = require('../models/listeners.model.server');

const findAllListeners = () => listenersModel.find();

const findListenerById = (listenerId) => listenersModel.findById(listenerId);

const findListenerBySpotifyId = (spotifyId) => listenersModel.find({"spotifyId": spotifyId});

const createListener = (listener) => listenersModel.create(listener);

const queryListener = (query) => listenersModel.find();

const updateListener = (listenerId, listener) => listenersModel.update({_id: listenerId}, {$set: {bio: listener.bio}});

const createReviewForListener = (listenerId, reviewId) => listenersModel.update({_id: listenerId}, {$push: {reviews: reviewId}});

const deleteReviewForListener = (listenerId, reviewId) => listenersModel.update({_id: listenerId}, {$pull: {reviews: reviewId}});

module.exports = {findAllListeners, findListenerById, findListenerBySpotifyId, updateListener, createListener, queryListener, createReviewForListener, deleteReviewForListener};

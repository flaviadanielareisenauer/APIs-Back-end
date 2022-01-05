const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const genresAPIController = {
  list: (req, res) => {
    db.Genre.findAll().then((genres) => {
      let respuesta = {
        meta: {
          status: 200,
          total: genres.length,
          url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        },
        data: genres,
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.Genre.findByPk(req.params.id).then((genre) => {
      let respuesta = {
        meta: {
          status: 200,
          total: genre.length,
          url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        },
        data: genre,
      };
      res.json(respuesta);
    });
  },

  genreMovies: (req, res) => {
    db.Genre.findByPk(req.params.id, {
      include: ["movies"],
    }).then((genre) => {
      let respuesta = {
        meta: {
          status: 200,
          total: genre.length,
          url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        },
        data: genre,
      };
      res.json(respuesta);
    });
  },
};

module.exports = genresAPIController;
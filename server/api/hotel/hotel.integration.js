'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newHotel;

describe('Hotel API:', function() {
  describe('GET /api/hotels', function() {
    var hotels;

    beforeEach(function(done) {
      request(app)
        .get('/api/hotels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          hotels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(hotels).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/hotels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/hotels')
        .send({
          name: 'New Hotel',
          info: 'This is the brand new hotel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newHotel = res.body;
          done();
        });
    });

    it('should respond with the newly created hotel', function() {
      expect(newHotel.name).to.equal('New Hotel');
      expect(newHotel.info).to.equal('This is the brand new hotel!!!');
    });
  });

  describe('GET /api/hotels/:id', function() {
    var hotel;

    beforeEach(function(done) {
      request(app)
        .get(`/api/hotels/${newHotel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          hotel = res.body;
          done();
        });
    });

    afterEach(function() {
      hotel = {};
    });

    it('should respond with the requested hotel', function() {
      expect(hotel.name).to.equal('New Hotel');
      expect(hotel.info).to.equal('This is the brand new hotel!!!');
    });
  });

  describe('PUT /api/hotels/:id', function() {
    var updatedHotel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/hotels/${newHotel._id}`)
        .send({
          name: 'Updated Hotel',
          info: 'This is the updated hotel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedHotel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHotel = {};
    });

    it('should respond with the updated hotel', function() {
      expect(updatedHotel.name).to.equal('Updated Hotel');
      expect(updatedHotel.info).to.equal('This is the updated hotel!!!');
    });

    it('should respond with the updated hotel on a subsequent GET', function(done) {
      request(app)
        .get(`/api/hotels/${newHotel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let hotel = res.body;

          expect(hotel.name).to.equal('Updated Hotel');
          expect(hotel.info).to.equal('This is the updated hotel!!!');

          done();
        });
    });
  });

  describe('PATCH /api/hotels/:id', function() {
    var patchedHotel;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/hotels/${newHotel._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Hotel' },
          { op: 'replace', path: '/info', value: 'This is the patched hotel!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedHotel = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedHotel = {};
    });

    it('should respond with the patched hotel', function() {
      expect(patchedHotel.name).to.equal('Patched Hotel');
      expect(patchedHotel.info).to.equal('This is the patched hotel!!!');
    });
  });

  describe('DELETE /api/hotels/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/hotels/${newHotel._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when hotel does not exist', function(done) {
      request(app)
        .delete(`/api/hotels/${newHotel._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});

'use strict';

var app = require('../..');
var request = require('supertest');

var newDockerimg;

describe('Dockerimg API:', function() {

  describe('GET /api/dockerimgs', function() {
    var dockerimgs;

    beforeEach(function(done) {
      request(app)
        .get('/api/dockerimgs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          dockerimgs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      dockerimgs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/dockerimgs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dockerimgs')
        .send({
          name: 'New Dockerimg',
          info: 'This is the brand new dockerimg!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newDockerimg = res.body;
          done();
        });
    });

    it('should respond with the newly created dockerimg', function() {
      newDockerimg.name.should.equal('New Dockerimg');
      newDockerimg.info.should.equal('This is the brand new dockerimg!!!');
    });

  });

  describe('GET /api/dockerimgs/:id', function() {
    var dockerimg;

    beforeEach(function(done) {
      request(app)
        .get('/api/dockerimgs/' + newDockerimg._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          dockerimg = res.body;
          done();
        });
    });

    afterEach(function() {
      dockerimg = {};
    });

    it('should respond with the requested dockerimg', function() {
      dockerimg.name.should.equal('New Dockerimg');
      dockerimg.info.should.equal('This is the brand new dockerimg!!!');
    });

  });

  describe('PUT /api/dockerimgs/:id', function() {
    var updatedDockerimg

    beforeEach(function(done) {
      request(app)
        .put('/api/dockerimgs/' + newDockerimg._id)
        .send({
          name: 'Updated Dockerimg',
          info: 'This is the updated dockerimg!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDockerimg = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDockerimg = {};
    });

    it('should respond with the updated dockerimg', function() {
      updatedDockerimg.name.should.equal('Updated Dockerimg');
      updatedDockerimg.info.should.equal('This is the updated dockerimg!!!');
    });

  });

  describe('DELETE /api/dockerimgs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/dockerimgs/' + newDockerimg._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dockerimg does not exist', function(done) {
      request(app)
        .delete('/api/dockerimgs/' + newDockerimg._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dockerimgCtrlStub = {
  index: 'dockerimgCtrl.index',
  show: 'dockerimgCtrl.show',
  create: 'dockerimgCtrl.create',
  update: 'dockerimgCtrl.update',
  destroy: 'dockerimgCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dockerimgIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dockerimg.controller': dockerimgCtrlStub
});

describe('Dockerimg API Router:', function() {

  it('should return an express router instance', function() {
    dockerimgIndex.should.equal(routerStub);
  });

  describe('GET /api/dockerimgs', function() {

    it('should route to dockerimg.controller.index', function() {
      routerStub.get
        .withArgs('/', 'dockerimgCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/dockerimgs/:id', function() {

    it('should route to dockerimg.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'dockerimgCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/dockerimgs', function() {

    it('should route to dockerimg.controller.create', function() {
      routerStub.post
        .withArgs('/', 'dockerimgCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/dockerimgs/:id', function() {

    it('should route to dockerimg.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'dockerimgCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dockerimgs/:id', function() {

    it('should route to dockerimg.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'dockerimgCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dockerimgs/:id', function() {

    it('should route to dockerimg.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'dockerimgCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

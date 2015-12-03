import request from 'supertest'
import appMock from './utils/app'
import json from '../src/json'

const plugin = json((req, res) => {
  res.json(res.body)
})
const app = appMock()
app.get('/api', function(req, res) {
  res.body = {hello: 'world'}
  plugin(req, res)
})

describe('netiam-contrib', () => {

  it('should return json', done => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body.should.have.property('hello')
        res.body.hello.should.eql('world')
      })
      .end(done)
  })

})

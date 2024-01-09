import supertest from 'supertest'
import app from '../app.js'

describe('Unit Test Suite', () => {
  it('GET /health API endpoint', (done) => {
    supertest(app)
      .get('/health')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  it('GET /API endpoint', (done) => {
    supertest(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  it('GET 404 API endpoint', (done) => {
    supertest(app)
      .get('/randomendpoint')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

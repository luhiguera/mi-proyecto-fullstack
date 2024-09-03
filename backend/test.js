const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API de Inventarios', () => {
  let token = '';
  let itemId = null;

  // Test para registrar un nuevo usuario
  it('Debería registrar un nuevo usuario', (done) => {
    chai.request(server)
      .post('/register')
      .send({ username: 'usuario@test.com', password: 'test1234' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('Usuario registrado con éxito');
        done();
      });
  });

  // Test para iniciar sesión y obtener el token JWT
  it('Debería iniciar sesión y devolver un token JWT', (done) => {
    chai.request(server)
      .post('/login')
      .send({ username: 'usuario@test.com', password: 'test1234' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  // Test para añadir un nuevo ítem al inventario
  it('Debería añadir un nuevo ítem al inventario', (done) => {
    chai.request(server)
      .post('/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Lápiz', quantity: 100, price: 0.5 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        itemId = res.body.id;
        done();
      });
  });

  // Test para obtener todos los ítems del inventario
  it('Debería obtener todos los ítems del inventario', (done) => {
    chai.request(server)
      .get('/inventory')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.above(0);
        done();
      });
  });

  // Test para actualizar un ítem del inventario
  it('Debería actualizar un ítem del inventario', (done) => {
    chai.request(server)
      .put(`/inventory/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Lápiz', quantity: 150, price: 0.75 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').eql('Lápiz');
        expect(res.body).to.have.property('quantity').eql(150);
        expect(res.body).to.have.property('price').eql(0.75);
        done();
      });
  });

  // Test para eliminar un ítem del inventario
  it('Debería eliminar un ítem del inventario', (done) => {
    chai.request(server)
      .delete(`/inventory/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
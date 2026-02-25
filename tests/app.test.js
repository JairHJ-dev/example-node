const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../lib/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5);
      expect(result).toBe(50);
    });

    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5);
      expect(result).toBe(0);
    });
    test('Debe retornar 0 si el stock es 0 aunque el precio sea alto', () => {
      const result = calculateValue(5000, 0);
      expect(result).toBe(0);
    });
    test('Debe calcular correctamente valores con decimales (centavos)', () => {
      const result = calculateValue(10.5, 2);
      expect(result).toBe(21);
    });
  });


  describe('Pruebas de Integración - API Endpoints', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // Validamos que el primer objeto tenga las propiedades requeridas
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('stock');
    });
    test('GET /unknown -Debe responder con 404 si la ruta no existe', async () => {
      const response = await request(app).get('/api/v1/no-existe');
      expect(response.statusCode).toBe(404);
    });
    test('GET /items -El primer producto debe tener un nombre válido (string)', async () => {
      const response = await request(app).get('/items');
      expect(response.body[0]).toHaveProperty('name');
      expect(typeof response.body[0].name).toBe('string');
    });
  });
});

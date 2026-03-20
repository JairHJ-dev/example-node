// --- INICIO CÓDIGO PROMETHEUS ---
const client = require('prom-client');

// 1. Habilitar métricas por defecto de Node.js
client.collectDefaultMetrics();

// 2. Crear métricas personalizadas
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP procesadas',
  labelNames: ['metodo', 'ruta', 'estado_http'],
});

const activeUsersGauge = new client.Gauge({
  name: 'active_users_current',
  help: 'Número actual de usuarios activos simulados'
});

// Middleware para contar todas las peticiones
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.route ? req.route.path : req.path, res.statusCode).inc();
  });
  next();
});

// 3. RUTA VITAL: Endpoint /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});
// --- FIN CÓDIGO PROMETHEUS ---
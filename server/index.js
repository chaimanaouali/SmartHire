// Update CORS config to allow frontend origin
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
})); 
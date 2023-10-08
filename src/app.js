import bodyParser from 'body-parser';
//import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath
//Importamos la configuracion de multer
import upload from './multer.js';
//Importamos las rutas
import empresasRoutes from './routes/empresas.routes.js';
import indexRoutes from './routes/index.routes.js';
import rutasRoutes from './routes/rutas.routes.js';
// Obtén la ruta del directorio actual utilizando import.meta.url y fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
//Importamos multer
app.use(upload);
// Configuramos el middleware morgan para el registro de solicitudes
app.use(morgan('dev'));
// Configuramos cors
//app.use(cors())
// Configuramos ejs
app.set('view engine', 'ejs');
//Configuramos las vistas
app.set('views', path.join(__dirname, 'views'));
//Configuramos body-parser para el manejo de solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
//Configuramos las rutas
app.use('/', indexRoutes);
app.use('/empresas', empresasRoutes);
app.use('/rutas', rutasRoutes);
// Not found route
app.use((req, res, next) => {
    res.status(404).render('404');  // Renderiza la vista de error 404
});
//Configuramos las imagenes
app.use(express.static(path.join(__dirname, 'public'))); // Configura la carpeta 'public' como estática
export default app;
import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  // ../browser
  const distFolder = join(process.cwd(), 'dist/frontend/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  
  ///////////////////

const multipart = require ('connect-multiparty');
const bodyParser = require ('body-parser');
const path = require ('path')
const app = express();
const user = require('./models/userModel')
const cors = require('cors')
require('./database')


const multiPartMiddleware = multipart({
    uploadDir: './subidas'

});

server.use(bodyParser.json({limit: '200mb'}));
server.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
server.use(express.json()); //ojo la posicion tiene que estar antes del server.use('/api', require('./router'))
server.use(cors()); //ojo la posicion tiene que estar antes del server.use('/api', require('./router'))
// server.use('/',express.static('client', {redirect:false}));
server.use('/api', require('./routers/router'))
server.use('/ccam/upload', express.static(path.resolve('./subidas')))

server.use('/ccam2', require('./routers/routerCCAM'))
server.use('/revista', require('./routers/routerRevista'))
server.use('/anunciante', require('./routers/routerAnunciante'))
server.use('/carousel', require('./routers/routerCarousel'))  //nuevo
server.use('/guia', require('./routers/routerGuia'))  //nuevo

server.use('/portada', require('./routers/routerPortada'))  //nuevo
server.use('/categorias', require('./routers/routerCategorias'))  //nuevo
server.use('/varios', require('./routers/routerVarios'))  //nuevo


server.post('/upload', multiPartMiddleware, (req:any,res)=>{
   console.log('imagenes')
    var link = req.files['archivos'].path
      
// var url = 'http://localhost:3000/upload/'+ link.slice(8) 
var url = 'https://www.culturademontania.org.ar/ccam/upload/'+ link.slice(8) 

console.log({'url': url })
    res.json({'url':url });
    
    
});

server.post('/upload2', multiPartMiddleware, (req:any,res)=>{   
    var link = req.files['upload'].path      
    var url = 'https://www.culturademontania.org.ar/ccam/upload/'+ link.slice(8) 
    console.log({'url': url })
    res.json({'url':url });
    
    
});



///////////////////////////////
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4100;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
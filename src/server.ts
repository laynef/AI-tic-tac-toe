import path from 'path';
import express from 'express';

import htmlMiddleware from './server/middleware/html';
import renderMiddleware from './server/middleware/render';

const publicPath = path.join(__dirname, 'public');
const app = express();

app.use(express.static(publicPath));
app.use(htmlMiddleware());
app.use(renderMiddleware());

export default app;

const express = require('express');
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const loginRouter = require('./routes/login');
const excelRouter = require('./routes/excel');
const logoutRouter = require('./routes/logout');


const app = express();
app.set('port', 8080);

app.use(express.json({ limit: '100mb' }));
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());

app.use('/api/excel', excelRouter)
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter)

app.listen(8080, function () {
    console.log('listening on 8080')
})
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import cors from 'cors';
// import bcrypt from 'bcrypt';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3005;
const app = express();
// const router = express.Router();

app.use(cors({
  credentials: true,
  origin: true,
}));

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.listen(PORT, () => {
  console.log('server start on port ', PORT);
});

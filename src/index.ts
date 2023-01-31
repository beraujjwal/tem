import App from 'system/app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();

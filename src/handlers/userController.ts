import {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const user = new User();

const register = async (req: Request, res: Response) => {
  const newUser = await user.createUser(req.body);
  res.json(newUser);
};

const showUsers = async (_req: Request, res: Response) => {
  const users = await user.showUsers();
  res.json(users);
};

const getUser = async (req: Request, res: Response) => {
  const users = await user.getUser(parseInt(req.params.id));
  res.json(users);
};

const deleteUser = async (req: Request, res: Response) => {
  const users = await user.deleteUser(parseInt(req.params.id));
  res.json(users);
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, password } = req.body;

    const userInfo = await user.authenticateUser(id, password);

    if (userInfo) {
      const token = jwt.sign(
        { userInfo },
        process.env.JWT_SECRET as string,
      );
      res.header('auth-token', token).send({ token });
    } else {
      return res.status(400).send('Password is wrong');
    }
  } catch (err) {
    res.status(400);
    next(err);
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', verifyAuthToken, showUsers);
  app
    .route('/users/:id')
    .get(verifyAuthToken, getUser)
    .delete(verifyAuthToken, deleteUser);
  app.post('/register', register);
  app.post('/login', login);
};

export default userRoutes;

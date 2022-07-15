import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/productsController";
import orderRoutes from "./handlers/orderController";
import userRoutes from "./handlers/userController";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(port, () => {
  console.log(`starting app on port: ${port}`);
});

export default app;

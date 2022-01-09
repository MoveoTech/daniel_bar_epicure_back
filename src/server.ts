import express, { Request, Response, Application } from "express";
import cors from "cors";
import { connectToDB } from "./services/db.service";
import restaurantRoutes from "./api/routes/restaurant.routes";
import dishRoutes from "./api/routes/dish.routes";
import chefRoutes from "./api/routes/chef.routes";
import userRoutes from "./api/routes/user.routes"

const app: Application = express();

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://localhost:4200",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user",userRoutes)
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/dish", dishRoutes);
app.use("/api/chef", chefRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

const port = process.env.PORT || 8000;

init();

async function init() {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

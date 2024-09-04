import { app } from "@/app";
import MongooseSingleton from "./infra/mongoose";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  MongooseSingleton.getInstance()
    .connect()
    .then(() => {
      console.log("DocumentDB connected");
    })
    .catch((err) => {
      console.error(err);
    });
});

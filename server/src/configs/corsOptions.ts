import { CorsOptions } from "cors";

const allowedOrigins = [process.env.APP_URL ?? "https://duosy.vercel.app"];
console.log(allowedOrigins);
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (origin && origin === "https://duosy.vercel.app") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export { corsOptions };

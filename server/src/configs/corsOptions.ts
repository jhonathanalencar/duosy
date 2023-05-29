import { CorsOptions } from "cors";

const allowedOrigins = ["https://duosy.vercel.app"];
console.log(allowedOrigins);
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (origin && allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export { corsOptions };

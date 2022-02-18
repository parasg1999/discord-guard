import { verify } from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const { COOKIE_NAME, JWT_SECRET } = process.env;

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        if (!req.cookies[COOKIE_NAME]) {
          throw Error("No user");
        }

        if (!req.body.name) {
          throw Error("No data to update");
        }

        const user = verify(req.cookies[COOKIE_NAME], JWT_SECRET);

        const selectedUser = await User.findOneAndUpdate(
          { id: user.id },
          { name: req.body.name },
          { new: true }
        );

        const token = jwt.sign(selectedUser.toJSON(), JWT_SECRET, {
          expiresIn: "24h",
        });

        await res.setHeader(
          "Set-Cookie",
          cookie.serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
            path: "/",
            maxAge: 86400,
          })
        );

        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

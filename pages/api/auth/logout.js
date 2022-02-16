import cookie from "cookie";

const { COOKIE_NAME } = process.env;

export default async (req, res) => {
  if (req.method !== "GET") return res.redirect("/");

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
  );

  // Redirect back to the homepage
  res.redirect("/");
};

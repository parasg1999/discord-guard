import jwt from "jsonwebtoken";
import cookie from "cookie";
import axios from "axios";

const {
  DISCORD_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  NEXT_APP_URL,
  JWT_SECRET,
  COOKIE_NAME,
} = process.env;

// Create scopes, oauth querystring and URIs
const scope = ["identify", "email"].join(" ");
const REDIRECT_URI = `${NEXT_APP_URL}/api/auth/discord/callback`;

const OAUTH_QS = new URLSearchParams({
  client_id: DISCORD_CLIENT_ID || "0",
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope,
  prompt: "none",
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

export default async (req, res) => {
  if (req.method !== "GET") return res.redirect("/");

  const { code = null, error = null } = req.query;

  // If there is an error, redirect to the index page
  if (error) {
    return res.redirect("/?error=oauth");
  }

  // If there is no code, redirect to the OAuth URI
  if (!code || typeof code !== "string")
    return res.redirect("/api/auth/discord/login");

  const body = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code,
    scope,
  }).toString();

  console.log(body);

  // Request our access token, defaulting it to null if something goes wrong
  const { access_token = null, ...a } = await axios({
    url: "https://discord.com/api/oauth2/token",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    data: body,
  }).then((res) => res.data);

  if (!access_token || typeof access_token !== "string") {
    return res.redirect(OAUTH_URI);
  }

  console.log(a);

  try {
    const { data: currentUser } = await axios({
      method: "get",
      url: "https://discord.com/api/users/@me",
      headers: { Authorization: `Bearer ${access_token}` },
    });

    console.log(currentUser);

    if (!("id" in currentUser)) {
      return res.redirect(OAUTH_URI);
    }

    const token = jwt.sign(currentUser, JWT_SECRET, { expiresIn: "24h" });

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
  } catch (e) {
    console.log("uhuh");
  }

  // Redirect back to the homepage
  res.redirect("/");
};

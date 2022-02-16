const { DISCORD_CLIENT_ID, NEXT_APP_URL } = process.env;

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

  return res.redirect(OAUTH_URI);
};

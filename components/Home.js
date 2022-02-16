import axios from "axios";

const Home = () => {
  const signInWithDiscord = () => {
    window.location = "/api/auth/discord/login";
  };

  return (
    <div>
      <p>
        Sign in with your Discord account to join the community &amp; manage
        your server preferences.
      </p>
      <button onClick={signInWithDiscord}>Sign in with discord</button>
    </div>
  );
};

export default Home;

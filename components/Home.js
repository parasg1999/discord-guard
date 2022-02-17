import axios from "axios";
import styles from "../styles/Home.module.scss";
import Paper from "./Paper";
import discord from "../public/discord.svg";
import Image from "next/image";

const Home = () => {
  const signInWithDiscord = () => {
    window.location = "/api/auth/discord/login";
  };

  return (
    <Paper>
      <p className={styles.text}>
        Sign in with your Discord account to join the community &amp; manage
        your server preferences.
      </p>
      <button className={styles.discordButton} onClick={signInWithDiscord}>
        <img src="/discord.svg" className={styles.discordImage} />
        Sign in with Discord
      </button>
    </Paper>
  );
};

export default Home;

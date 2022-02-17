import Image from "next/image";
import Link from "next/link";
import Paper from "./Paper";
import styles from "../styles/Profile.module.scss";

const Profile = ({ user }) => {
  return (
    <Paper>
      <div className={styles.userBanner}>
        <div className={styles.left}>
          <span className={styles.main}>
            Hey <span className={styles.colorName}>{user.username}</span>! 👋
          </span>
          <span className={styles.sub}>
            Not you? <Link href="/api/auth/logout">Sign Out</Link>
          </span>
        </div>
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          width={50}
          height={50}
          alt={`profile`}
        />
      </div>
      <div></div>
      <div className={styles.userInfo}>
        <div>
          <span>Name</span>
          <span>{user.username}</span>
        </div>

        <div>
          <span>Discord Email</span>
          <span>{user.email}</span>
        </div>
      </div>

      <div>
        <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER} target="_blank">
          <button className={styles.discordButton}>
            <img src="/discord.svg" className={styles.discordImage} />
            Open Discord
          </button>
        </Link>
        <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER} target="_blank">
          <button className={styles.discordButton}>
            <img src="/discord.svg" className={styles.discordImage} />
            Open Discord
          </button>
        </Link>
      </div>
    </Paper>
  );
};

export default Profile;

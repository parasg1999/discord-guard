import Image from "next/image";
import Link from "next/link";
import Paper from "./Paper";
import styles from "../styles/Profile.module.scss";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Profile = ({ user, isEditMode }) => {
  const [name, setName] = useState(user.name);
  const router = useRouter();

  const handleDetailsSubmit = async () => {
    const { data } = await axios.put("/api/user", {
      name,
    });
    if (data.success) {
      router.replace("/");
    } else {
      alert("Something happened");
    }
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  return (
    <Paper>
      <div className={styles.userBanner}>
        <div className={styles.left}>
          <span className={styles.main}>
            Hey, <span className={styles.colorName}>{user.name}</span>! 👋
          </span>
          <span className={styles.sub}>
            Not you?{" "}
            <Link href="/api/auth/logout">
              <span className={styles.link}>Sign Out</span>
            </Link>
          </span>
        </div>
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          width={50}
          height={50}
          alt={`profile`}
        />
      </div>
      {!isEditMode ? (
        <div className={styles.userInfo}>
          <div className={styles.infoBlock}>
            <span className={styles.infoHeader}>Name</span>
            <span className={styles.infoContent}>{user.name}</span>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.infoHeader}>Discord Email</span>
            <span className={styles.infoContent}>{user.email}</span>
          </div>
        </div>
      ) : (
        <div className={styles.editableInfo}>
          <div className={styles.infoBlock}>
            <span className={styles.infoHeader}>Full Name</span>
            <input
              className={styles.infoInput}
              onChange={changeName}
              value={name}
            />
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.infoHeader}>Email</span>
            <input
              className={`${styles.infoInput} ${styles.disabled}`}
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>
      )}

      <div className={styles.buttons}>
        {!isEditMode ? (
          <>
            <Link href="/profile/edit" target="_blank">
              <button className={styles.editButton}>Edit Profile</button>
            </Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER} target="_blank">
              <button className={styles.discordButton}>
                <img src="/discord.svg" className={styles.discordImage} />
                Launch Discord
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleDetailsSubmit}
            className={styles.discordButton}
          >
            Submit
          </button>
        )}
      </div>
    </Paper>
  );
};

export default Profile;

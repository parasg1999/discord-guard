import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProfile() {
  return (
    <div className={styles.container}>
      {status === "unauthenticated" && (
        <form method="post" action="/api/auth/signin/discord">
          <input name="csrfToken" hidden defaultValue={csrfToken} />
          <button type="submit">Sign in please</button>
        </form>
      )}

      {status === "loading" && <div>hfsuhfgiushguishd</div>}
      {status === "authenticated" && (
        <div>
          Hey {session.user.name}! 👋 Not you?
          <form method="post" action="/api/auth/signout">
            <input name="csrfToken" hidden defaultValue={csrfToken} />
            <button type="submit">Logout</button>
          </form>
        </div>
      )}
    </div>
  );
}

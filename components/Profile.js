import Image from "next/image";
import Link from "next/link";

const Profile = ({ user }) => {
  return (
    <div>
      <div>
        <div>
          <span>Hey {user.username}! 👋</span>
          <span>
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

      <div>
        <span>Name</span>
        <span>{user.username}</span>
      </div>

      <div>
        <span>Discord Email</span>
        <span>{user.email}</span>
      </div>

      <div>
        <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER} target="_blank">
          Open Discord
        </Link>
      </div>
    </div>
  );
};

export default Profile;

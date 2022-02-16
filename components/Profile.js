import Image from "next/image";

const Profile = ({ user }) => {
  return (
    <div>
      <div>
        <div>
          <span>Hey {user.username}! 👋</span>
          <span>
            Not you? <a href="/api/auth/logout">Sign Out</a>
          </span>
        </div>
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          width={50}
          height={50}
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
        <a href={process.env.NEXT_PUBLIC_DISCORD_SERVER} target="_blank">
          Open Discord
        </a>
      </div>
    </div>
  );
};

export default Profile;

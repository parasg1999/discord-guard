import Image from "next/image";
import styles from "../styles/Header.module.scss";

const Header = () => {
  return (
    <div>
      <Image
        src={process.env.NEXT_PUBLIC_HEADER_LOGO}
        height={120}
        width={120}
      />
      <h1 className={styles.banner}>Discord Community</h1>
    </div>
  );
};

export default Header;

import classNames from "classnames"
import CustomDropdown from "components/Common/CustomDropdown/CustomDopdown"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { logoutUser } from "store/module/auth/action-creators"
import { RootState, useAppDispatch } from "store/store"
import styles from "./styles.module.scss"

const UserAvatar = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <CustomDropdown
      dropdownMenu={
        <div className={styles.menu}>
          <div className={styles.currentUser}>
            <div className={styles.currentUser__name}>{user.userName}</div>
            <div className="username">{`@${user.userName}`}</div>
          </div>
          <div className={styles.divider} />
          <ul className={styles.expandMenu}>
            <li>
              <Link href={`/profile/${user.userName}`} legacyBehavior>
                <a className={styles.expandMenu__item}>
                  <i className="fa-solid fa-user" />
                  Trang cá nhân
                </a>
              </Link>
            </li>
            <div className={styles.divider} />
            <li>
              <span
                className={styles.expandMenu__item}
                onClick={() => {
                  logout()
                }}
              >
                <i className="fa fa-sign-out-alt" />
                Đăng xuất
              </span>
            </li>
          </ul>
        </div>
      }
    >
      <div className={classNames(styles.userHeader, "menu-styled")}>
        <Image
          src={"/images/default.jpeg"}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt={"avatar"}
        />
      </div>
    </CustomDropdown>
  )
}

export default UserAvatar

import classNames from "classnames"
import ImageCustom from "components/Common/ImageCustom"
import Tag from "components/Common/Tag"
import CustomButton from "components/User/Button"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { HiOutlineUser } from "react-icons/hi2"
interface IProps {
  isDetail?: boolean
  className?: string
}

const CardService = ({ isDetail = true, className }: IProps) => {
  const { t } = useTranslation(["ser"])

  return (
    <Link
      href={"/services/1"}
      className={classNames(
        className,
        "overflow-hidden bg-white border border-solid border-[#EAEAEA] rounded-xl inline-block max-w-[315px] w-full"
      )}
    >
      <div className="relative w-full h-[140px]">
        <ImageCustom
          src={"/images/sample-2.png"}
          fill
          alt="service"
          classNameImage="object-cover"
        />
      </div>
      <div className="px-2 py-2 md:px-[18px] md:py-3">
        <h4 className="text-sm font-semibold md:text-lg text-h1 line-clamp-2">
          Gói xét nghiệm tổng quát
        </h4>
        {isDetail && <Tag className="w-fit">Tim mạch</Tag>}
        {isDetail && (
          <div className="flex items-center justify-between mt-4 md:mt-6">
            <div className="flex items-center gap-x-1">
              <HiOutlineUser />
              <span>20</span>
            </div>
            <svg
              width="97"
              height="16"
              viewBox="0 0 97 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.65298 13.9245L8.05265 12.1496L11.4523 13.9245C11.9417 14.18 12.5117 13.764 12.4178 13.22L11.7696 9.46692L14.5163 6.80812C14.9143 6.42285 14.6961 5.74839 14.1479 5.66928L10.3481 5.12098L8.64965 1.70346C8.4045 1.21017 7.7008 1.21017 7.45565 1.70346L5.75719 5.12098L1.95744 5.66928C1.40918 5.74839 1.19097 6.42285 1.58898 6.80812L4.33572 9.46692L3.68751 13.22C3.59355 13.764 4.16363 14.18 4.65298 13.9245Z"
                fill="#92929D"
              />
              <path
                d="M24.653 13.9245L28.0527 12.1496L31.4523 13.9245C31.9417 14.18 32.5117 13.764 32.4178 13.22L31.7696 9.46692L34.5163 6.80812C34.9143 6.42285 34.6961 5.74839 34.1479 5.66928L30.3481 5.12098L28.6497 1.70346C28.4045 1.21017 27.7008 1.21017 27.4556 1.70346L25.7572 5.12098L21.9574 5.66928C21.4092 5.74839 21.191 6.42285 21.589 6.80812L24.3357 9.46692L23.6875 13.22C23.5936 13.764 24.1636 14.18 24.653 13.9245Z"
                fill="#92929D"
              />
              <path
                d="M44.653 13.9245L48.0527 12.1496L51.4523 13.9245C51.9417 14.18 52.5117 13.764 52.4178 13.22L51.7696 9.46692L54.5163 6.80812C54.9143 6.42285 54.6961 5.74839 54.1479 5.66928L50.3481 5.12098L48.6497 1.70346C48.4045 1.21017 47.7008 1.21017 47.4556 1.70346L45.7572 5.12098L41.9574 5.66928C41.4092 5.74839 41.191 6.42285 41.589 6.80812L44.3357 9.46692L43.6875 13.22C43.5936 13.764 44.1636 14.18 44.653 13.9245Z"
                fill="#92929D"
              />
              <path
                d="M64.653 13.9245L68.0527 12.1496L71.4523 13.9245C71.9417 14.18 72.5117 13.764 72.4178 13.22L71.7696 9.46692L74.5163 6.80812C74.9143 6.42285 74.6961 5.74839 74.1479 5.66928L70.3481 5.12098L68.6497 1.70346C68.4045 1.21017 67.7008 1.21017 67.4556 1.70346L65.7572 5.12098L61.9574 5.66928C61.4092 5.74839 61.191 6.42285 61.589 6.80812L64.3357 9.46692L63.6875 13.22C63.5936 13.764 64.1636 14.18 64.653 13.9245Z"
                fill="#92929D"
              />
              <path
                d="M84.653 13.9245L88.0527 12.1496L91.4523 13.9245C91.9417 14.18 92.5117 13.764 92.4178 13.22L91.7696 9.46692L94.5163 6.80812C94.9143 6.42285 94.6961 5.74839 94.1479 5.66928L90.3481 5.12098L88.6497 1.70346C88.4045 1.21017 87.7008 1.21017 87.4556 1.70346L85.7572 5.12098L81.9574 5.66928C81.4092 5.74839 81.191 6.42285 81.589 6.80812L84.3357 9.46692L83.6875 13.22C83.5936 13.764 84.1636 14.18 84.653 13.9245Z"
                fill="#92929D"
              />
            </svg>
          </div>
        )}
        <div className="flex flex-col-reverse items-start justify-between mt-4 md:items-center gap-y-2 md:gap-y-0 md:flex-row">
          <CustomButton
            kind="primary"
            size="small"
            className="w-full rounded-sm md:w-fit h-9 md:h-10"
          >
            <span className="text-[10px] md:text-xs">{t("ser:btnItem")}</span>
          </CustomButton>
          <div className="flex items-center gap-x-1 ">
            <svg
              width={17}
              height={16}
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.44285 2.11455C7.94295 1.61445 8.62123 1.3335 9.32847 1.3335H13.1667C14.2713 1.3335 15.1667 2.22893 15.1667 3.3335V7.17174C15.1667 7.87898 14.8858 8.55726 14.3857 9.05735L9.24759 14.1954C8.46654 14.9765 7.20021 14.9765 6.41916 14.1954L2.30478 10.081C1.52373 9.29999 1.52373 8.03366 2.30478 7.25262L7.44285 2.11455ZM9.32847 2.66683C8.97485 2.66683 8.63571 2.80731 8.38566 3.05735L3.24759 8.19543C2.98724 8.45578 2.98724 8.87788 3.24759 9.13823L7.36197 13.2526C7.62232 13.513 8.04443 13.513 8.30478 13.2526L13.4429 8.11454C13.6929 7.8645 13.8334 7.52536 13.8334 7.17174V3.3335C13.8334 2.96531 13.5349 2.66683 13.1667 2.66683H9.32847Z"
                fill="#F4BF59"
              />
              <path
                d="M2.89062 6.66644L3.83343 5.72363L10.7762 12.6664L9.83343 13.6093L2.89062 6.66644Z"
                fill="#F4BF59"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 6.66667C10.8682 6.66667 11.1667 6.36819 11.1667 6C11.1667 5.63181 10.8682 5.33333 10.5 5.33333C10.1318 5.33333 9.83333 5.63181 9.83333 6C9.83333 6.36819 10.1318 6.66667 10.5 6.66667ZM10.5 8C11.6046 8 12.5 7.10457 12.5 6C12.5 4.89543 11.6046 4 10.5 4C9.39543 4 8.5 4.89543 8.5 6C8.5 7.10457 9.39543 8 10.5 8Z"
                fill="#F4BF59"
              />
            </svg>
            <span>120.000 đ</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardService

import Head from "next/head";

export interface IUserLayout extends React.ComponentPropsWithoutRef<"div"> {
  justify?: "items-center" | "items-start";
}

const UserLayout: React.FC<IUserLayout> = ({
  children,
  justify = "items-center",
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>NextJs Fullstack App Template</title>
      </Head>
      <div {...divProps} className={`min-h-screen flex flex-col ${justify}`}>
        {/* <Header /> */}
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default UserLayout;

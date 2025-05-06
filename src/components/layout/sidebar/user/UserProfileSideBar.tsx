import logo from "../../../../../public/images.jpeg";
type Props = {
  userInfo: {
    email: string;
    username: string;
    name: string;
    id: string | undefined;
  };
};

const UserProfileSideBar = ({ userInfo }: Props) => {
  console.log(userInfo);
  return (
    <div className="flex flex-col items-center">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
        <img alt="profile user" src={logo} className="object-cover" />
      </div>
      {/* */}

      <div>
        <h4 className="capitalize mt-1 text-2xl">{userInfo.username}</h4>
      </div>
    </div>
  );
};

export default UserProfileSideBar;

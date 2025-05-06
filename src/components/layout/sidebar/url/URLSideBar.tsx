import { Box } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import Item from "./Item";


type Props = {
  link: any;
};

const URLSideBar = ({ link }: Props) => {
  // ******************** S  T  A  T  E *************************
  // ****************side-pro
  const { collapsed } = useProSidebar();

  // ************* R E N D E R*************
  return (
    <Box
      paddingLeft={collapsed ? undefined : "10%"}
      sx={{ mt: "50px", display: "flex", flexDirection: "column" }}
    >
      {link?.map((element) => (
        <div key={element.name} className="border-b border-gray-300 py-1">
          <h3 className={`text-[14px] capitalize ${collapsed && "text-center"}`}>
            {element.name}
          </h3>

          <div>
            {element.children.map((children) => (
              <Item
                key={children.name}
                path={children.path}
                name={children.name}
                icon={children.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </Box>
  );
};

export default URLSideBar;

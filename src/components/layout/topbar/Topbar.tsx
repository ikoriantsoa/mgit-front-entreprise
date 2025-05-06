// import { Box } from "@mui/material";

import ButtonGroups from "./groupeButton/ButtonGroups";

import ButtonSearch from "./buttonSearch.tsx/ButtonSearch";
import { useMediaQuery } from "@mui/material";


// / Définition du composant fonctionnel `Topbar`.


const Topbar = () => {

  // 
  const moyenne=useMediaQuery('(max-width:370px)') && useMediaQuery('(max-width:398px)');
  const petiteEcran= useMediaQuery('(max-width:370px)');

  console.log(petiteEcran)
  return (
    // <Box display="flex" justifyContent="space-between" p={2} position="fixed">
    <div className={`flex fixed w-full bg-white border border-gray-200 top-0 z-[100] md:sticky  py-3 px-4 justify-between  mb-5 
    ${moyenne && "w-full grid grid-cols-2"} ${petiteEcran && "grid grid-cols-4"}`}>
      {/* *************** barre recherch ************** */}
      <ButtonSearch />

      {/* *******************Buttons ********** */}
      <ButtonGroups />
    </div>
    // </Box>
  );
};

export default Topbar;

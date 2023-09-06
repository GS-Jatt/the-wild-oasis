import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkModeContext } from "../context/DarModeContext";

export default function DarkModeToggle() {
    const { isDarkMode, darkModeToggle} = useDarkModeContext();
    
    return (
        <ButtonIcon onClick={darkModeToggle}>
            {isDarkMode ? <HiOutlineSun/>:<HiOutlineMoon/>}
        </ButtonIcon>
    )
}
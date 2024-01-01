import { HiArrowRightOnRectangle, HiArrowTopRightOnSquare } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

export default function Logout() {
    const { logout, isLoading } = useLogout();
    return <ButtonIcon onClick={logout} disabled={isLoading}>
        <HiArrowRightOnRectangle />
    </ButtonIcon>
}
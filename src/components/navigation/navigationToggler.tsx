import ClickAwayListener from "@mui/material/ClickAwayListener";
import Image from "next/image";
import { MyButton } from "..";
import { useMenuVisibilityContext } from "@/contexts";

const NavigationToggler = () => {
    const { toggleMenuVisibility, hideMenu } = useMenuVisibilityContext();

    return (
        <ClickAwayListener onClickAway={hideMenu}>
            <MyButton aria-label="navigation toggler" className="btn btn-normal btn-hamburger" onClick={toggleMenuVisibility}>
                <Image src={`/icons/hamburger.svg`} alt={`web site navigation toggler`} width={30} height={30} />
            </MyButton>
        </ClickAwayListener>
    );
};
export default NavigationToggler;

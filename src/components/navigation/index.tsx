"use client";

import Fade from "@mui/material/Fade";
import { useId } from "react";

import Link from "./link";
import { PAGES as LINKS } from "@/types";
import NavigationToggler from "./navigationToggler";
import { useMenuVisibilityContext } from "@/contexts";

export default function Navigation() {
    const { isMenuVisible } = useMenuVisibilityContext();

    const ID = useId();

    return (
        <section aria-label="navigation container">
            <NavigationToggler />
            <Fade in={isMenuVisible}>
                <nav aria-label="site navigation" className={"navbar navbar--active"} itemScope itemType="http://schema.org/LocalBusiness">
                    <ul className="navbar__list">
                        {LINKS.map(link => (
                            <Link key={`${ID}-${link}`} page={link} />
                        ))}
                    </ul>
                </nav>
            </Fade>
        </section>
    );
}

import React from "react";
import { LuHeart } from "react-icons/lu";

function Footer(){
    return(
        <div className="footer">
            <p>
                Creado con {<LuHeart />} por <a href="https://github.com/ninoxander">Dani</a> y <a href="https://github.com/evilelliot/">Pedro</a>
            </p>
        </div>
    );
}

export default Footer;
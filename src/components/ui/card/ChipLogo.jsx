import ChipWhite from "../../../card_images/chip-white-shaded.png";
import ChipBlue from "../../../card_images/chip-blue-shaded.png";
import LogoWhite from "../../../card_images/logo-white-shaded.png";
import LogoBlue from "../../../card_images/logo-blue-shaded.png";

export default function ChipLogo(props) {
    const { color } = props;
    return (
        <>
            <img src={color === "white"?ChipBlue:ChipWhite} 
                alt="Изображение чипа" 
                className="card-chip" 
            />
            <img src={color === "white"?LogoBlue:LogoWhite} 
                alt="Изображение логотипа" 
                className="card-logo" 
            />
        </>
    );
}
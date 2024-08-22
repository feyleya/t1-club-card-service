import MenuButton from "./MenuButton";

export default function Menu(){
    return (
        <div className="menu-block">
            <MenuButton name="Карта"/>
            <MenuButton name="QR-код"/>
            <MenuButton name="Профиль"/>
            <MenuButton name="Персонализация"/>
        </div>
    );
}
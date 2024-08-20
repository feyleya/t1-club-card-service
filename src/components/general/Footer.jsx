export default function Footer() {
    let year = new Date().getFullYear();
    return (
        <footer>
            Copyright ©{year} "T1-CLUB". Все права защищены.
        </footer>
    );
}
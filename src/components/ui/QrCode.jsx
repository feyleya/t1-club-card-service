import QR from "../../images/QR-code.jpg"

export default function QrCode(){
    return(
        <div className="qrcode-block">
            <img src={QR} alt="qr-код" className="qr-image" />
        </div>
    );
}
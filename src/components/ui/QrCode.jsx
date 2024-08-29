import QR from "../../images/QR-code.jpg"
import QRCode from 'qrcode'
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../additional/context";

export default function QrCode(){
    const { cardNumber } = useContext(AppContext);
    const [ qrcodeUrl, setQrcodeUrl ] = useState("");

    useEffect(() => {
        QRCode.toDataURL(cardNumber, { errorCorrectionLevel: 'H' })
          .then(url => setQrcodeUrl(url))
          .catch(err => console.error(err));
      }, [cardNumber]);

    return(
        <div className="qrcode-block">
            {qrcodeUrl ? <img src={qrcodeUrl} alt="QR-Code" /> : <p>Генерация QR-кода...</p>}
        </div>
    );
}
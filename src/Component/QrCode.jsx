import { saveAs } from "file-saver"
import { useState } from "react"

export const QrCode = () => {
    const [ img ,setImage] = useState("")
    const [ loading, setLoading] = useState(false)
    const [qrData, setQrData] = useState("")
    const [ qrSize, SetQrSize] = useState("")

    const downloadQR=  ()=>{
        try {
            saveAs(img, "image.jpg")
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const generateQR= ()=>{
        setLoading(true)
        try {
            const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImage(url)
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }

    }
    return (
        <div className="app-container">
            <h1>QR Code <br /> Generator</h1>
            {img && qrData ? <img src={img} alt="" className="qr-code-image" /> : null}
            {loading && <p>Please wait...</p>}
            <label htmlFor=""><strong>Data for QR Code</strong></label>
            <input type="text" name="qrCode" id="qrCode" required placeholder="Ex. www.google.com" value={qrData} onChange={(e)=>setQrData(e.target.value)} />
            <label htmlFor=""><strong>Image Size</strong></label>
            <select className="image-size-input-box" id="" value={qrSize} onChange={(e)=>SetQrSize(e.target
                .value)}>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="250">250</option>
            </select>

            <div className="button">
                <button type="submit" className="generator-btn" onClick={generateQR} disabled={loading}><b>Generate QR Code</b></button>
                {img && qrData ? <button type="submit" className="download-btn" onClick={downloadQR} ><b>Download QR Code</b></button> : null}
            </div>
        </div>
    )
}

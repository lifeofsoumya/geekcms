import { useState } from "react";

import { storage } from "@/static/firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"




export default function ImageUpload({ returnImage }){
    const [imageasFile, setImageAsFile] = useState();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageAsFile = async(e) => {
        const image = e.target.files[0]
        setImageAsFile(image);
        if(image){
            uploadToFireBase(image);
        }
        
    }
    const uploadToFireBase = async(image)=> {
        setLoading(true);
        const storageRef = ref(storage, `images/${image.name}`);

        try {
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
            returnImage(url);
        } catch (error) {
            console.error('error took place', error.message);
        } finally {
            setLoading(false);
        }
    }
    return <div className="py-2 flex flex-col gap-5 w-full">
        <label className="w-fit">
            <span className="bg-gray-500/10 border-2 border-gray-500 border-dashed p-3 rounded w-[300px]">Upload Cover image</span>
            <input type="file" onChange={handleImageAsFile} hidden />
        </label>
        <div>
        {
            loading && (
                <button disabled>
                    Uploading...
                </button>
            )
        }
        { imageUrl && (
            <div>
                <h3>Uploaded successfully!</h3>
                <img className="border border-gray-400 rounded-md" src={imageUrl} alt="upload image" style={{width: '30%'}} />
            </div>
        )}
        </div>
    </div>
}
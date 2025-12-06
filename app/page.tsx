"use client"
import Image from "next/image";
import Button from "@/app/components/Button/Button";
import PuzzleImage from "@/app/components/PuzzleImage/PuzzleImage";
import styles from './page.module.scss'
import {useState} from "react";

export default function Home() {
    const [loadedImage, setLoadedImage] = useState<string>("");
    const [preview, setPreview] = useState(true);
    const [isShuffled, setShuffled] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLoadedImage(imageUrl);
            console.log(imageUrl);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.layoutContainer}>
                <div className={styles.container}>
                    <Button onClick={() => {
                        setPreview(false)
                        setShuffled(!isShuffled)
                    }} title={"shuffle"} icon={"shuffle-icon.svg"} type={"shuffle"}/>
                    <Button  onClick={() => setPreview(true)} title={"preview"} icon={"preview-icon.svg"} type={"preview"}/>
                </div>
                <div className={styles.uploadContainer}>
                </div>
                    <input
                        className={styles.uploadInput}
                        onChange={onChange}
                        type="file"
                        id="fileUpload"
                    />

                    <label htmlFor="fileUpload" className={styles.uploadLabel}>
                        <img className={styles.icon} src="./icons/upload.svg" />
                        <span className={styles.title}>upload</span>
                    </label>
            </div>
            <PuzzleImage  isShuffled={isShuffled} shuffled={preview} image={loadedImage}/>
        </div>
    );
}
"use client"
import styles from './PuzzleImage.module.scss'
import {useState, useEffect} from "react";


interface Props {
    image: string | undefined;
    shuffled: boolean;
    isShuffled: boolean;
}

const PuzzleImage = (props: Props) => {
    const [pieces, setPieces] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5));
    const [dragging, setDragging] = useState<number | null>(null);


    useEffect(() => {
        const newPices = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
        setPieces(newPices)

    }, [props.isShuffled]);

    const dragStart = (i: number) => {
        setDragging(i);
    }

    function drop(i: number) {
        if (dragging === null) return;

        const newPieces = [...pieces];
        const temp = newPieces[dragging];
        newPieces[dragging] = newPieces[i];
        newPieces[i] = temp;

        setPieces(newPieces);
        setDragging(null);

        if (newPieces.every((p, idx) => p === idx)) {
            alert('შენ ეს შეძელი!');
        }
    }

    return (
        <div className={styles.container}>

            {

                props.shuffled ?
                    <div className={styles.unShuffledImage}>
                        <img className={styles.containerPreview} src={props.image} alt={props.image} />
                    </div> :

                    <div className={styles.puzleContainer}>
                        {pieces.map((num, i) => (
                            <div
                                key={i}
                                draggable
                                onDragStart={() => dragStart(i)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => drop(i)}
                                style={{
                                    width: '133px',
                                    height: '133px',
                                    backgroundImage: `url(${props.image})`,
                                    backgroundPosition: `-${(num % 3) * 133}px -${Math.floor(num / 3) * 133}px`,
                                    backgroundSize: '400px 400px',
                                    cursor: 'grab',
                                    opacity: dragging === i ? 0.3 : 1
                                }}
                            />
                        ))}
                    </div>
            }

        </div>
    );
};

export default PuzzleImage;
;
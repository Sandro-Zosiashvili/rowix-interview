"use client"
import styles from './Button.module.scss'

interface Props {
    title: string;
    icon: string;
    type: "shuffle" | "preview" | "upload"
    onClick?: () => void;
    onFileSelect?: (file: File) => void;
}

const Button = (props: Props) => {
    if (props.type === "upload") {
        return (
            <label className={styles[props.type]}>
                <input
                    type="file"
                    onChange={(e) => e.target.files?.[0] && props.onFileSelect?.(e.target.files[0])}
                    style={{ display: 'none' }}
                />
                <span>
                    <img className={styles.icon} src={`./icons/${props.icon}`} alt={props.title}/>
                </span>
                <span>{props.title}</span>
            </label>
        )
    }

    return (
        <button onClick={props.onClick} className={styles[props.type]}>
            <span>
                <img className={styles.icon} src={`./icons/${props.icon}`} alt={props.title}/>
            </span>
            <span>{props.title}</span>
        </button>
    )
}

export default Button;
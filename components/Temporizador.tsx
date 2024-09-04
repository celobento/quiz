import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface TemporizadorProps {
    key: number 
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps) {
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                size={120}
                duration={props.duracao}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors= {['#bce596', '#f7b801', '#ed827a', '#A70B00']}
                colorsTime={[10, 6, 3, 0]} >
                {({remainingTime}) => remainingTime}        
            </CountdownCircleTimer>
        </div>
    )
}
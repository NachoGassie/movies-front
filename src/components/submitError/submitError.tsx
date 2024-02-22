import styles from './submitError.module.css';

export default function SubmitError({msg }: {msg: string}) {
  return (
    <div className={styles.submitError}>
      <p>{msg}</p>
    </div>
  )
}

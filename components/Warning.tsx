import styles from '../styles/Warning.module.css';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface WarningProps {
  text: string;
  hidden: boolean;
}

export default function Warning(props: WarningProps) {
  const {text, hidden} = props;
  return !hidden ? (
    <p className={styles.warning}>
      <ErrorOutlineOutlinedIcon className={styles.icon}/>{text}
    </p>
  ) : null
}
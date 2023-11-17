import styles from '../styles/ItemList.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListItemProps {
  value: string;
  handleDelete: (channelName: string) => void;
  key: any;
}

export default function ListItem(props: ListItemProps) {
const {value, handleDelete} = props;

return (
  <div className={styles.item}>
    <span className={styles.channelName}>{value}</span>
    <div className={styles.buttonsContainer}>
      <button onClick={() => handleDelete(value)}>
        <DeleteIcon className={styles.icons}/>
      </button>
      <button>
        <EditIcon className={styles.icons}/>
      </button>
    </div>
  </div>
)
}
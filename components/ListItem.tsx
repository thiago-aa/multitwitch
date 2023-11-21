import styles from '../styles/ItemList.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListItemProps {
  value: string;
  handleDelete: (index: any) => void;
  handleEdit: (index: any) => void;
  index: number;
}

export default function ListItem(props: ListItemProps) {
const {value, handleDelete, handleEdit, index} = props;

return (
  <div className={styles.item}>
    <span className={styles.channelName}>{value}</span>
    <div className={styles.buttonsContainer}>
      <button onClick={() => handleDelete(index)}>
        <DeleteIcon className={styles.icons}/>
      </button>
      <button onClick={() => handleEdit(index)}>
        <EditIcon className={styles.icons}/>
      </button>
    </div>
  </div>
)
}
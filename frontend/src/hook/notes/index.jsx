import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { useState } from "react";
import api from "../../services/api";
import { AiTwotoneDelete } from "react-icons/ai";
import Loading from "../../img/loading2.gif";

function Notes({ data, handleDelete, loading }) {
  const [changedNote, setChangedNote] = useState("");

  async function handleSave(e, notes) {
    if (changedNote && changedNote !== notes) {
      await api.post(`annotations/update/${data._id}`, {
        notes: changedNote,
      });
    }
  }

  return (
    <>
      <div className={styles.Card}>
        <strong>{data.title}</strong>
        <textarea
          onChange={(e) => setChangedNote(e.target.value)}
          onBlur={(e) => handleSave(e.target, data.notes)}
          defaultValue={data.notes}
        ></textarea>
        {loading ? (
          <img width={20} className={styles.Trash} src={Loading} />
        ) : (
          <AiTwotoneDelete
            onClick={() => handleDelete(data._id)}
            className={styles.Trash}
          />
        )}
      </div>
    </>
  );
}

Notes.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Notes;

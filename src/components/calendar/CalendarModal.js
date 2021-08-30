import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActive, eventUpdated } from '../../actions/events';
import { useEffect } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
}

export const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const { modalOpen } = useSelector(state => state.ui);
  const { eventActive } = useSelector(state => state.calendar);
  const [formValues, setFormValues] = useState(initEvent);

  useEffect(() => {
    if (eventActive) {
      setFormValues(eventActive);
    } else {
      setFormValues(initEvent);
    }
  }, [eventActive, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  };
  const dispatch = useDispatch();
  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({ ...formValues, start: e });
  }
  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({ ...formValues, end: e });
  }
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValues(initEvent);
  }
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(formValues.start);
    const momentEnd = moment(formValues.end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'La fecha final debe ser mayor a la fecha de inicio', 'error');
    }
    if (formValues.title.trim() < 2) {
      return setTitleValid(false);
    }
    if (eventActive) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '12345',
          name: 'Deymer'
        }
      }));
    }
    setTitleValid(true);
    closeModal();
  }
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{eventActive ? 'Editando evento' : 'Nuevo evento'}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            format="y-MM-dd h:mm a"
            amPmAriaLabel="Select AM/PM"
          />
        </div>
        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            format="y-MM-dd h:mm a"
            amPmAriaLabel="Select AM/PM"
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span>Guardar</span>
        </button>
      </form>
    </Modal>
  )
};

import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Modal from "react-modal";
import "dayjs/locale/es"
import "./App.css";
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
dayjs.locale("es");

export default function App() {
  const localizer = dayjsLocalizer(dayjs);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", location: "" });

  // Función para verificar si el nuevo rango se solapa con eventos existentes
  const isOverlapping = (start, end) => {
    return events.some(event =>
      dayjs(start).isBefore(event.end) && dayjs(end).isAfter(event.start)
    );
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo;
    // Verifica si el rango seleccionado se solapa con algún evento existente
    if (isOverlapping(start, end)) {
      toast.error("El rango de horas seleccionado ya está ocupado.");
      return;
    }
    setSelectedSlot(slotInfo);
    setIsOpen(true);
  };

  const handleSlotStyle = (slotInfo) => {
    const { start, end } = slotInfo;
    if (
      selectedSlot &&
      dayjs(selectedSlot.start).isSame(start, "hour") &&
      dayjs(selectedSlot.end).isSame(end, "hour")
    ) {
      return {
        backgroundColor: "rgba(0,0,0,0.1)",
      };
    }

    return {};
  };

  const handleSaveEvent = () => {
    if (!selectedSlot) return;
    const newEventObj = {
      title: newEvent.title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      data: {
        description: newEvent.description,
        location: newEvent.location,
      }
    };
    setEvents([...events, newEventObj]);
    setIsOpen(false);
    setNewEvent({ title: "", description: "", location: "" });
  };

  // Función para ocultar el domingo
  const dayPropGetter = (date) => {
    const day = dayjs(date).day();
    if (day === 0) { // 0 es Domingo
      return {
        style: { display: 'none' }
      };
    }
    return {};
  };

  return (
    <>
    <Toaster />
    <div style={{ height: "95vh", width: "70vw" ,}}>
      <Calendar
        localizer={localizer}
        events={events}
        view={"week"}
        views={["week"]}
        date={dayjs("2023-12-19T12:00:00").toDate()}
        toolbar={true}
        selectable
        onSelectSlot={handleSelectSlot}
        dayPropGetter={dayPropGetter}
        slotPropGetter={handleSlotStyle}
        formats={{ dayFormat: 'dddd', }}
        timeslots={2}
        min={dayjs().hour(7).minute(0).toDate()}
        max={dayjs().hour(22).minute(0).toDate()}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '300px',
          }
        }}
        contentLabel="Crear Evento"
      >
        <h2>Crear Evento</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSaveEvent(); }}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </div>
          <div>
            <label>Ubicación:</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
        </form>
      </Modal>
    </div>
    </>
  );
}
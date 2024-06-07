import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Modal from "react-modal";
import "dayjs/locale/es"
import "./App.css";
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import ModalComponent from "./components/Modal";
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


  const handleSaveEvent = () => {
    if (!selectedSlot) return;
    const newEventObj = {
      title: newEvent.title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      data: {
        description: newEvent.description,
        location: newEvent.location,
      },
    };
    setEvents([...events, newEventObj]);
    setIsOpen(false);
    setNewEvent({ title: "", description: "", location: "" });
  };

  return (
    <div>
      <h1 className="text-center my-5 text-2xl font-bold text-purple-700">React Big Calendar - Test</h1>
      <Toaster />
      <div>
        <Calendar
          className="text-5xl "
          style={{ marginLeft: "20px", marginRight: '20px', padding: '10px', backgroundColor: "white", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", borderRadius: '20px', fontSize: "1.2em" }}
          localizer={localizer}
          events={events}
          slotPropGetter={() => {
            let newStyle = {
              backgroundColor: "white",
              color: 'black',
              borderRadius: "0px",
              border: "none",
            };
            return {
              style: newStyle
            };
          }
          }
          enableAutoScroll={true}
          step={60}
          view={"week"}
          date={dayjs("2023-12-19T12:00:00").toDate()}
          toolbar={false}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={() => {
            let newStyle = {
              backgroundColor: "purple",
              color: 'white',
              borderRadius: "0px",
              border: "none",
              display: 'block',
              alignItems: "center",
              textAlign: "center",
            };
            return {
              style: newStyle
            };
          }}
          formats={{ dayFormat: 'ddd', }}
          timeslots={1}
          min={dayjs().hour(7).minute(0).toDate()}
          max={dayjs().hour(22).minute(0).toDate()}
        />
      </div>
      <ModalComponent
        handleSaveEvent={handleSaveEvent}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
      <p className="text-center my-2 text-sm">Authors: Esteban Najera, Francisco Amador, Jesus Abarca</p>
    </div>
  );
}
import React from 'react'
import Modal from "react-modal";

function ModalComponent({ modalIsOpen, setIsOpen, newEvent, setNewEvent, handleSaveEvent }) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '20px',
                    textAlign: 'center',
                    width: '300px',
                }
            }}
            contentLabel="Crear Evento"
        >
            <h2 className='text-xl font-bold'>Crear Evento</h2>
            <form className='space-y-5' onSubmit={(e) => { e.preventDefault(); handleSaveEvent(); }}>
                <div className=' text-left'>
                    <label className='font-bold'>Título</label>
                    <input
                        className='bg-gray-200 border-2 border-gray-300 p-2 w-full rounded-lg'
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        required
                    />
                </div>
                <div className='text-left'>
                    <label className='font-bold'>Descripción</label>
                    <input
                        className='bg-gray-200 border-2 border-gray-300 p-2 w-full rounded-lg'
                        type="text"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                </div>
                <div className='text-left'>
                    <label className='font-bold'>Ubicacion</label>
                    <input
                        className='bg-gray-200 border-2 border-gray-300 p-2 w-full rounded-lg'
                        type="text"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                </div>
                <div className='flex justify-between mt-5'>
                    <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded font-bold uppercase' type="submit">Guardar</button>
                    <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded font-bold uppercase' type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalComponent
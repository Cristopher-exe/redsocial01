import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import "./Reservation.css";

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', eventDate: new Date(), location: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [locationInputValue, setLocationInputValue] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, eventDate: date });
    };

    const handleSelect = async (address) => {
        setSearchTerm(''); // Limpiamos searchTerm
        setLocationInputValue(address); // Actualizamos locationInputValue
        try {
            const results = await geocodeByAddress(address);
            const latLng = await getLatLng(results[0]);
            setSelectedPlace({ address, latLng });
            setFormData({ ...formData, location: address }); // Agregamos la ubicación al formData
            console.log('Ubicación seleccionada:', address); // Agregar este console.log
        } catch (error) {
            console.error('Error fetching place details', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData); // Agregar este console.log
        if (isEditing) {
            const updatedReservations = reservations.map(reservation =>
                reservation.id === formData.id ? formData : reservation
            );
            setReservations(updatedReservations);
            setIsEditing(false);
        } else {
            setReservations([...reservations, { ...formData, id: Date.now() }]);
        }
        setFormData({ id: null, name: '', email: '', eventDate: new Date(), location: '' }); // Limpiamos el formData
        setSelectedPlace(null); // Limpiamos la ubicación seleccionada
        setLocationInputValue(''); // Limpiamos el valor del campo de entrada de ubicación
    };

    const handleEdit = (id) => {
        const reservationToEdit = reservations.find(reservation => reservation.id === id);
        setFormData(reservationToEdit);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        const updatedReservations = reservations.filter(reservation => reservation.id !== id);
        setReservations(updatedReservations);
    };

    const filteredReservations = reservations.filter(reservation => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            reservation.name.toLowerCase().includes(searchTermLowerCase) ||
            reservation.email.toLowerCase().includes(searchTermLowerCase) ||
            reservation.eventDate.toString().toLowerCase().includes(searchTermLowerCase)
        );
    });

    return (
        <div>
          <h2>__________________________</h2>
            <h2> Reservaciones <i class="fa-solid fa-shop"/> </h2>
            
            <button>INVITAR MIEMBROS <i class="fa-regular fa-circle-user"/></button> {/* Botón de invitación */}
            
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Correo Electrónico:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <label>
                    Ubicación:
                    <PlacesAutocomplete
                        value={locationInputValue}
                        onChange={setLocationInputValue}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input {...getInputProps({ placeholder: 'Buscar ubicación' })} />
                                <div>
                                    {loading ? <div>Cargando...</div> : null}
                                    {suggestions.map(suggestion => {
                                        const style = {
                                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                                        };
                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </label>
                <label>
                    Fecha del Evento:
                    <DatePicker selected={formData.eventDate} onChange={handleDateChange} />
                </label>
                <button type="submit">{isEditing ? 'Editar' : 'Agregar'} Reserva <i class="fa-duotone fa-download"/></button>
            </form>
            <ul>
                {filteredReservations.map(reservation => (
                    <li key={reservation.id}>
                        <div>
                            <strong>{reservation.name}</strong> - {reservation.email} - {reservation.eventDate.toString()}
                        </div>
                        <button onClick={() => handleEdit(reservation.id)}>Editar</button>
                        <button onClick={() => handleDelete(reservation.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <LoadScript googleMapsApiKey="AIzaSyD5E3E8-Cazi2Se_I8reX4YwVL9CvV6M84" libraries={['places']}>
                <div className="map-container">
                    <GoogleMap
                        center={{ lat: 15.2, lng: -86.2 }}
                        zoom={8}
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                    >
                        {selectedPlace && (
                            <Marker position={selectedPlace.latLng} />
                        )}
                    </GoogleMap>
                </div>
            </LoadScript>
        </div>
    );
};

export default Reservation;
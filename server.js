const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3030;

//  entidad 'events'
let events = [{
    id: 1,
    name: "Pago de luz",
    description: "Pago directo desde website amagua",
    amount: 200,
    date: "2025-09-18",
    type: "egreso"
}];

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

// todos los eventos
app.get('/api/events', (req, res) => {
    res.status(200).json({ code: 'OK', message: 'Eventos disponibles', data: { events } });
});

// nuevo evento
app.post('/api/events', (req, res) => {
    console.log('POST /api/events:', req.body);
    const newEvent = {
        id: events.length + 1, 
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type,
    };
    events.push(newEvent);
    res.status(201).json({ code: 'OK', message: 'Evento creado exitosamente', data: { event: newEvent } });
});

// actualizar un evento por ID
app.put('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        const updatedEvent = {
            ...events[eventIndex],
            ...req.body,
            id: eventId,
        };
        events[eventIndex] = updatedEvent;
        res.status(200).json({ code: 'OK', message: 'Evento actualizado exitosamente', data: { event: updatedEvent } });
    } else {
        res.status(404).json({ code: 'PF', message: 'Evento no encontrado' });
    }
});

//eliminar un evento por ID
app.delete('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const initialLength = events.length;
    events = events.filter(e => e.id !== eventId);
    if (events.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).json({ code: 'PF', message: 'Evento no encontrado' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
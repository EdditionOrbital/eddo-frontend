import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

export default function InlineCalendar() {
  const [date, setDate] = useState(null);
  return <Calendar value={date} onChange={e => setDate(e.value)} inline />;
}

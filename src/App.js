import './App.css';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

function App() {
  const Checklist = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
      if (selectedDate) {
        generateDates(selectedDate);
      }
    }, [selectedDate]);

    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

    const generateDates = (startDateStr) => {
      const startDate = new Date(startDateStr);
      const newItems = [];
      for (let i = 0; i < 100; i++) { // Generate 20 dates, 4 days apart
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + (i * 4));
        newItems.push({ id: i, date: newDate.toDateString() });
      }
      setItems(newItems);
    };

    const exportToPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(12);
      let y = 10; // Start position for the first line
      const lineHeight = 10; // Height of each line
      const pageHeight = doc.internal.pageSize.height; // Height of the page
      const maxLinesPerPage = Math.floor(pageHeight / lineHeight) - 1; // Calculate maximum lines per page
      
      items.forEach((item, index) => {
        if (y > pageHeight - lineHeight) { // If we exceed the page height, add a new page
          doc.addPage();
          y = 10; // Reset y position for new page
        }
        doc.text(`${index + 1}. ${item.date}`, 10, y);
        y += lineHeight; // Move to next line
      });
      
      doc.save('checklist.pdf');
    };

    return (
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <ul>
          {items.map(item => (
            <ol className='checklist' key={item.id}>
              <span>{item.id + 1}</span>
              <input type="checkbox" />

              <li>{item.date}</li>
            </ol>
          ))}
        </ul>
        <button disabled={!selectedDate} onClick={exportToPDF}>Export to PDF</button>
      </div>
    );
  };

  return (
    <div className="App">
      <Checklist />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const TimetableTracker = () => {
  const [schedule, setSchedule] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    day: 'Monday',
    startTime: '',
    endTime: '',
    room: '',
    professor: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`);

  useEffect(() => {
    const savedSchedule = localStorage.getItem('timetable');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);  

  useEffect(() => {
    localStorage.setItem('timetable', JSON.stringify(schedule));
  }, [schedule]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkTimeConflict = (newClass) => {
    return schedule.some(existing => 
      existing.day === newClass.day &&
      ((newClass.startTime >= existing.startTime && newClass.startTime < existing.endTime) ||
       (newClass.endTime > existing.startTime && newClass.endTime <= existing.endTime))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.startTime >= formData.endTime) {
      alert('End time must be after start time');
      return;
    }

    const newClass = {
      ...formData,
      id: editingClass ? editingClass.id : Date.now()
    };

    if (checkTimeConflict(newClass) && !editingClass) {
      alert('Time slot conflict detected!');
      return;
    }

    if (editingClass) {
      setSchedule(schedule.map(item => 
        item.id === editingClass.id ? newClass : item
      ));
    } else {
      setSchedule([...schedule, newClass]);
    }

    setFormData({
      subject: '',
      day: 'Monday',
      startTime: '',
      endTime: '',
      room: '',
      professor: ''
    });
    setShowForm(false);
    setEditingClass(null);
  };

  const deleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setSchedule(schedule.filter(item => item.id !== id));
    }
  };

  const editClass = (classItem) => {
    setEditingClass(classItem);
    setFormData(classItem);
    setShowForm(true);
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#1E3A8A', fontSize: '2rem' }}>📅 Timetable Tracker</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {showForm ? 'Close Form' : '+ Add Class'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} style={{
              backgroundColor: '#F3F4F6',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Day</label>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Room</label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Professor</label>
                  <input
                    type="text"
                    name="professor"
                    value={formData.professor}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #D1D5DB'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '1rem'
                }}
              >
                {editingClass ? 'Update Class' : 'Add Class'}
              </button>
            </form>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', backgroundColor: '#1E40AF', color: 'white' }}>Time</th>
                  {days.map(day => (
                    <th key={day} style={{ padding: '1rem', backgroundColor: '#1E40AF', color: 'white' }}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, index) => (
                  <tr key={time} style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : 'white' }}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 'bold' }}>{time}</td>
                    {days.map(day => {
                      const classItem = schedule.find(item => 
                        item.day === day &&
                        item.startTime <= time &&
                        item.endTime > time
                      );

                      return (
                        <td key={day} style={{ 
                          padding: '1rem', 
                          borderBottom: '1px solid #E5E7EB',
                          backgroundColor: classItem ? '#DBEAFE' : 'transparent'
                        }}>
                          {classItem && (
                            <div>
                              <div style={{ fontWeight: 'bold', color: '#1E40AF' }}>{classItem.subject}</div>
                              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Room: {classItem.room}</div>
                              <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>{classItem.professor}</div>
                              <div style={{ marginTop: '0.5rem' }}>
                                <button
                                  onClick={() => editClass(classItem)}
                                  style={{
                                    backgroundColor: '#3B82F6',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    marginRight: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem'
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteClass(classItem.id)}
                                  style={{
                                    backgroundColor: '#EF4444',
                                    color: 'white',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem'
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/home" style={{
            backgroundColor: '#1E3A8A',
            color: '#F9FAFB',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default TimetableTracker;
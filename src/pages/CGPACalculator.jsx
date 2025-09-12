import React, { useState, useEffect } from 'react';

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState([]);
  const [currentSemester, setCurrentSemester] = useState({
    semesterNumber: 1,
    subjects: []
  });
  const [newSubject, setNewSubject] = useState({
    name: '',
    credits: '',
    grade: ''
  });
  const [showAddSubject, setShowAddSubject] = useState(false);

  // Grade points mapping
  const gradePoints = {
    'O': 10,    // Outstanding
    'A+': 9,    // Excellent
    'A': 8,     // Very Good
    'B+': 7,    // Good
    'B': 6,     // Above Average
    'C': 5,     // Average
    'P': 4,     // Pass
    'F': 0      // Fail
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('cgpaData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSemesters(parsedData.semesters || []);
      setCurrentSemester(parsedData.currentSemester || {
        semesterNumber: 1,
        subjects: []
      });
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      semesters,
      currentSemester
    };
    localStorage.setItem('cgpaData', JSON.stringify(dataToSave));
  }, [semesters, currentSemester]);

  // Calculate SGPA for a semester
  const calculateSGPA = (subjects) => {
    if (subjects.length === 0) return 0;
    
    const totalCredits = subjects.reduce((sum, subject) => sum + parseFloat(subject.credits), 0);
    const totalGradePoints = subjects.reduce((sum, subject) => {
      return sum + (parseFloat(subject.credits) * gradePoints[subject.grade]);
    }, 0);
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
  };

  // Calculate overall CGPA
  const calculateCGPA = () => {
    const allSemesters = [...semesters];
    if (currentSemester.subjects.length > 0) {
      allSemesters.push(currentSemester);
    }
    
    if (allSemesters.length === 0) return 0;
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    allSemesters.forEach(semester => {
      semester.subjects.forEach(subject => {
        const credits = parseFloat(subject.credits);
        const points = gradePoints[subject.grade];
        totalCredits += credits;
        totalGradePoints += credits * points;
      });
    });
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
  };

  // Add subject to current semester
  const addSubject = () => {
    if (newSubject.name && newSubject.credits && newSubject.grade) {
      setCurrentSemester(prev => ({
        ...prev,
        subjects: [...prev.subjects, { ...newSubject, id: Date.now() }]
      }));
      setNewSubject({ name: '', credits: '', grade: '' });
      setShowAddSubject(false);
    }
  };

  // Remove subject from current semester
  const removeSubject = (subjectId) => {
    setCurrentSemester(prev => ({
      ...prev,
      subjects: prev.subjects.filter(subject => subject.id !== subjectId)
    }));
  };

  // Complete current semester and start new one
  const completeSemester = () => {
    if (currentSemester.subjects.length > 0) {
      setSemesters(prev => [...prev, currentSemester]);
      setCurrentSemester({
        semesterNumber: currentSemester.semesterNumber + 1,
        subjects: []
      });
    }
  };

  // Reset all data
  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset all CGPA data? This action cannot be undone.')) {
      setSemesters([]);
      setCurrentSemester({
        semesterNumber: 1,
        subjects: []
      });
      localStorage.removeItem('cgpaData');
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1E3A8A', fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            📊 Know Your CGPA
          </h2>
          <p style={{ color: '#6B7280', textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Calculate and track your Cumulative Grade Point Average across semesters
          </p>

          {/* CGPA Display */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: '#10B981',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {calculateCGPA()}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Overall CGPA</div>
            </div>
            
            {currentSemester.subjects.length > 0 && (
              <div style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {calculateSGPA(currentSemester.subjects)}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Semester {currentSemester.semesterNumber} SGPA
                </div>
              </div>
            )}
            
            <div style={{
              backgroundColor: '#8B5CF6',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {semesters.length + (currentSemester.subjects.length > 0 ? 1 : 0)}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Semesters</div>
            </div>
          </div>
        </div>

        {/* Current Semester */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#374151', fontSize: '1.5rem' }}>
              📚 Semester {currentSemester.semesterNumber}
            </h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowAddSubject(!showAddSubject)}
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {showAddSubject ? 'Cancel' : '+ Add Subject'}
              </button>
              
              {currentSemester.subjects.length > 0 && (
                <button
                  onClick={completeSemester}
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
                  Complete Semester
                </button>
              )}
            </div>
          </div>

          {/* Add Subject Form */}
          {showAddSubject && (
            <div style={{
              backgroundColor: '#F3F4F6',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Data Structures"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
                    Credits
                  </label>
                  <input
                    type="number"
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject(prev => ({ ...prev, credits: e.target.value }))}
                    placeholder="e.g., 4"
                    min="1"
                    max="10"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
                    Grade
                  </label>
                  <select
                    value={newSubject.grade}
                    onChange={(e) => setNewSubject(prev => ({ ...prev, grade: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Select Grade</option>
                    <option value="O">O - Outstanding (10)</option>
                    <option value="A+">A+ - Excellent (9)</option>
                    <option value="A">A - Very Good (8)</option>
                    <option value="B+">B+ - Good (7)</option>
                    <option value="B">B - Above Average (6)</option>
                    <option value="C">C - Average (5)</option>
                    <option value="P">P - Pass (4)</option>
                    <option value="F">F - Fail (0)</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={addSubject}
                disabled={!newSubject.name || !newSubject.credits || !newSubject.grade}
                style={{
                  backgroundColor: !newSubject.name || !newSubject.credits || !newSubject.grade ? '#9CA3AF' : '#10B981',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: !newSubject.name || !newSubject.credits || !newSubject.grade ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Add Subject
              </button>
            </div>
          )}

          {/* Current Semester Subjects */}
          {currentSemester.subjects.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#1E40AF', color: 'white' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Subject</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Credits</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Grade</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Grade Points</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSemester.subjects.map((subject, index) => (
                    <tr key={subject.id} style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : 'white' }}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                        {subject.name}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                        {subject.credits}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: subject.grade === 'F' ? '#EF4444' : '#10B981',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          {subject.grade}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                        {gradePoints[subject.grade]}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <button
                          onClick={() => removeSubject(subject.id)}
                          style={{
                            backgroundColor: '#EF4444',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{
                backgroundColor: '#EFF6FF',
                padding: '1rem',
                marginTop: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <strong style={{ color: '#1E40AF', fontSize: '1.1rem' }}>
                  Semester {currentSemester.semesterNumber} SGPA: {calculateSGPA(currentSemester.subjects)}
                </strong>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6B7280'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <p>No subjects added yet. Click "Add Subject" to get started!</p>
            </div>
          )}
        </div>

        {/* Completed Semesters */}
        {semesters.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#374151', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              📈 Completed Semesters
            </h3>
            
            {semesters.map((semester, index) => (
              <div key={index} style={{
                backgroundColor: '#F9FAFB',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#1E40AF', margin: 0 }}>Semester {semester.semesterNumber}</h4>
                  <div style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    SGPA: {calculateSGPA(semester.subjects)}
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  {semester.subjects.length} subjects • {semester.subjects.reduce((sum, s) => sum + parseFloat(s.credits), 0)} total credits
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grade Scale Reference */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#374151', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            📋 Grade Scale Reference
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} style={{
                backgroundColor: grade === 'F' ? '#FEE2E2' : '#ECFDF5',
                border: `2px solid ${grade === 'F' ? '#FECACA' : '#BBF7D0'}`,
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: grade === 'F' ? '#DC2626' : '#059669',
                  marginBottom: '0.5rem'
                }}>
                  {grade}
                </div>
                <div style={{ 
                  fontSize: '1.25rem', 
                  color: grade === 'F' ? '#DC2626' : '#059669'
                }}>
                  {points} points
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={resetAllData}
            style={{
              backgroundColor: '#EF4444',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🗑️ Reset All Data
          </button>
          
          <a href="/home" style={{
            backgroundColor: '#1E3A8A',
            color: '#F9FAFB',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;
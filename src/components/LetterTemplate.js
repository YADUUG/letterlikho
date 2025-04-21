import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "animate.css";
import "./LetterTemplate.css";

const letterTypes = {
  "Fee Concession": `I am writing to formally request a fee concession for the upcoming semester. Due to {reason}, I am currently facing financial difficulties and am unable to pay the full amount of tuition and fees. 

My name is {name}, studying in class {class}, batch {batch}. I have always been a dedicated student and remain committed to my education. I have consistently maintained good academic performance and actively participated in university activities. 

I kindly request your consideration for a fee concession, as it would significantly help me continue my studies without undue financial stress. I assure you that I will continue to perform well academically and uphold the university's standards. I would be extremely grateful for any support you can provide in this regard.`,

  "Leave Application": `I am writing to formally request leave due to {reason}. My name is {name}, from class {class}, batch {batch}. 

Due to unavoidable circumstances, I am unable to attend classes on the specified days and respectfully seek your approval for my leave. I will ensure that I catch up on any missed coursework and complete any pending assignments upon my return. 

I request you to kindly consider my application and grant me leave for the mentioned period. I will be grateful for your understanding and support.`,

  "Exam Reschedule": `I am writing to request a rescheduling of my exam due to {reason}. I am {name}, studying in class {class}, batch {batch}. 

Unfortunately, due to unforeseen circumstances, I will be unable to appear for the exam on the scheduled date. I am highly committed to my studies and wish to ensure that I fulfill all academic requirements. 

I would sincerely appreciate your consideration in allowing me to take the exam on an alternative date, as I do not wish to miss this important assessment. I am willing to comply with any necessary procedures required for rescheduling. Thank you for your time and understanding.`,

  "Income Tax Certificate": `I am writing to formally request an income tax certificate due to {reason}. My name is {name}, from batch {batch}, class {class}. 

This certificate is required for official and financial documentation purposes. It will assist in fulfilling necessary requirements related to my financial records, taxation, or scholarship applications. 

I kindly request you to issue the document at the earliest convenience. Your assistance in this matter would be highly appreciated. Please let me know if any additional information or formalities are needed. Thank you for your support and consideration.`,

  "Bonafide Certificate": `I am writing to request a bonafide certificate for {reason}. My name is {name}, studying in class {class}, batch {batch}. 

This certificate is required as proof of my enrollment in the institution for official or personal purposes. 

I would be grateful if you could kindly issue the bonafide certificate at your earliest convenience. Please let me know if any further information is required. Thank you for your cooperation.`,

  "Scholarship Request": `I am writing to apply for a scholarship due to {reason}. My name is {name}, from class {class}, batch {batch}. 

I am a diligent student with a consistent academic record and actively participate in extracurricular activities. Financial constraints are currently posing a challenge to my education. 

I would be deeply grateful if you could consider my application for the scholarship. Your support would allow me to continue my studies without financial hindrance. Thank you for your understanding and consideration.`,

  "Transfer Certificate": `I am writing to request a transfer certificate due to {reason}. My name is {name}, from class {class}, batch {batch}. 

I am required to obtain this certificate to complete my transfer process to another institution. 

I kindly request you to process my application at the earliest convenience. Please let me know if any additional documents or formalities are needed. Thank you for your cooperation.`,

  "Character Certificate": `I am writing to request a character certificate for {reason}. My name is {name}, from class {class}, batch {batch}. 

This certificate is necessary for my future academic or professional pursuits. 

I would appreciate your prompt attention to this request. Kindly let me know if any further details are needed. Thank you for your assistance and support.`
};

const LetterTemplate = () => {
  const [letterType, setLetterType] = useState("Fee Concession");
  const [details, setDetails] = useState({
    to: "",
    department: "",
    reason: "",
    name: "",
    rollNumber: "",
    studentId: "",
    phone: "",
    class: "",
    batch: ""
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const generateLetterBody = (template, details) => {
    return template.replace(/{reason}/g, details.reason || "________")
                   .replace(/{name}/g, details.name || "________")
                   .replace(/{class}/g, details.class || "________")
                   .replace(/{batch}/g, details.batch || "________")
                   .replace(/{rollNumber}/g, details.rollNumber || "________")
                   .replace(/{studentId}/g, details.studentId || "________")
                   .replace(/{phone}/g, details.phone || "________");
  };
  
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times");
    doc.setFontSize(16);
    doc.text(letterType, 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`To: ${details.to || "________"}`, 20, 40);
    doc.text(`Department: ${details.department || "________"}`, 20, 45);
    doc.text("Guru Nanak Dev University,", 20, 50);
    doc.text("Amritsar, Punjab, India - 143001", 20, 55);
    doc.setFontSize(14);
    doc.text(`Subject: ${letterType} Request`, 20, 70, { fontStyle: "bold" });
    doc.setFontSize(12);
    
    const bodyText = generateLetterBody(letterTypes[letterType], details);
    
    doc.text(bodyText, 20, 85, { align:"justify", maxWidth: 170 });
    doc.text("Thank you for your time and consideration.", 20, 160);
    doc.text("Sincerely,", 20, 170);
    doc.text(`${details.name || "________"}`, 20, 180);
    doc.text(`Class: ${details.class || "________"}`, 20, 185);
    doc.text(`Batch: ${details.batch || "________"}`, 20, 190);
    doc.text(`Roll Number: ${details.rollNumber || "________"}`, 20, 195);
    doc.text(`Student ID: ${details.studentId || "________"}`, 20, 200);
    doc.text(`Phone No: ${details.phone || "________"}`, 20, 205);
    doc.save(`${details.rollNumber} - ${letterType}.pdf`);
  };

  return (
    <div className="letter-container">
      <h2 className="title animate__animated animate__fadeInDown">{letterType} Letter</h2>
      
      <div className="form-group animate__animated animate__fadeIn">
        <label>Select Letter Type</label>
        <select 
          value={letterType} 
          onChange={(e) => setLetterType(e.target.value)}
          className="letter-type-select"
        >
          {Object.keys(letterTypes).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="letter-content animate__animated animate__fadeInUp">
        <div className="form-group">
          <label>To</label>
          <input 
            type="text" 
            name="to" 
            placeholder="Enter recipient name" 
            value={details.to} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input 
            type="text" 
            name="department" 
            placeholder="Enter department" 
            value={details.department} 
            onChange={handleChange} 
          />
        </div>

        <div className="university-info">
          <p>Guru Nanak Dev University,</p>
          <p>Amritsar, Punjab, India - 143001</p>
        </div>

        <div className="form-group">
          <label>Reason</label>
          <input 
            type="text" 
            name="reason" 
            placeholder="Enter reason" 
            value={details.reason} 
            onChange={handleChange} 
          />
        </div>

        <div className="letter-body">
          <p>{letterTypes[letterType].replace("{reason}", details.reason || "________")}</p>
        </div>

        <div className="signature-section">
          <p className="signature-label">Sincerely,</p>
          
          <div className="form-group">
            <label>Your Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={details.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Class</label>
            <input 
              type="text" 
              name="class" 
              placeholder="Class" 
              value={details.class} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Batch</label>
            <input 
              type="text" 
              name="batch" 
              placeholder="Batch - Passout Year" 
              value={details.batch} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input 
              type="text" 
              name="rollNumber" 
              placeholder="Roll Number" 
              value={details.rollNumber} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Student ID</label>
            <input 
              type="text" 
              name="studentId" 
              placeholder="Student ID" 
              value={details.studentId} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone No" 
              value={details.phone} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </div>

      <button 
        onClick={downloadPDF} 
        className="download-btn animate__animated animate__pulse animate__infinite"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default LetterTemplate;
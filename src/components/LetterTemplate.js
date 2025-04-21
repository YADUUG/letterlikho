import React from "react";
import { jsPDF } from "jspdf";
import {
  Container,
  Title,
  Select,
  TextInput,
  Text,
  Paper,
  Button,
  Stack,
  Divider,
  Group,
  Box,
  Stepper,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
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
  const [active, setActive] = React.useState(0);
  const [letterType, setLetterType] = React.useState("Fee Concession");
  
  const form = useForm({
    initialValues: {
      to: "",
      department: "",
      reason: "",
      name: "",
      rollNumber: "",
      studentId: "",
      phone: "",
      class: "",
      batch: ""
    },
    validate: {
      to: (value) => (value ? null : 'Recipient name is required'),
      department: (value) => (value ? null : 'Department is required'),
      reason: (value) => (value ? null : 'Reason is required'),
      name: (value) => (value ? null : 'Your name is required'),
      class: (value) => (value ? null : 'Class is required'),
      batch: (value) => (value ? null : 'Batch is required'),
    }
  });

  const nextStep = () => {
    if (active === 0) {
      if (!letterType) return;
    } else if (active === 1) {
      if (!form.values.to || !form.values.department || !form.values.reason) return;
    }
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
    doc.text(`To: ${form.values.to || "________"}`, 20, 40);
    doc.text(`Department: ${form.values.department || "________"}`, 20, 45);
    doc.text("Guru Nanak Dev University,", 20, 50);
    doc.text("Amritsar, Punjab, India - 143001", 20, 55);
    doc.setFontSize(14);
    doc.text(`Subject: ${letterType} Request`, 20, 70, { fontStyle: "bold" });
    doc.setFontSize(12);
    
    const bodyText = generateLetterBody(letterTypes[letterType], form.values);
    
    doc.text(bodyText, 20, 85, { align:"justify", maxWidth: 170 });
    doc.text("Thank you for your time and consideration.", 20, 160);
    doc.text("Sincerely,", 20, 170);
    doc.text(`${form.values.name || "________"}`, 20, 180);
    doc.text(`Class: ${form.values.class || "________"}`, 20, 185);
    doc.text(`Batch: ${form.values.batch || "________"}`, 20, 190);
    doc.text(`Roll Number: ${form.values.rollNumber || "________"}`, 20, 195);
    doc.text(`Student ID: ${form.values.studentId || "________"}`, 20, 200);
    doc.text(`Phone No: ${form.values.phone || "________"}`, 20, 205);
    doc.save(`${form.values.rollNumber || "letter"} - ${letterType}.pdf`);
  };

  return (
    <Container size="md" className="letter-container">
      <Title order={1} className="title" ta="center" mb="xl">
        Create Your Letter
      </Title>

      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Letter Type" description="Choose template">
            <Box mt="xl">
              <Select
                label="Select Letter Type"
                placeholder="Choose a letter type"
                value={letterType}
                onChange={setLetterType}
                data={Object.keys(letterTypes).map((type) => ({ value: type, label: type }))}
                size="md"
                radius="md"
                required
              />
              
              {letterType && (
                <Paper shadow="xs" p="md" mt="md" radius="md" withBorder>
                  <Text size="sm" c="dimmed">Preview:</Text>
                  <Text mt="xs">{letterTypes[letterType].split('\n')[0]}</Text>
                </Paper>
              )}
            </Box>
          </Stepper.Step>

          <Stepper.Step label="Recipient" description="Add details">
            <Stack gap="md" mt="xl">
              <TextInput
                label="To"
                placeholder="Enter recipient name"
                required
                {...form.getInputProps('to')}
              />

              <TextInput
                label="Department"
                placeholder="Enter department"
                required
                {...form.getInputProps('department')}
              />

              <TextInput
                label="Reason"
                placeholder="Enter reason"
                required
                {...form.getInputProps('reason')}
              />

              <Paper p="md" bg="gray.0" radius="md">
                <Text size="sm">Preview:</Text>
                <Text mt="xs">
                  {generateLetterBody(letterTypes[letterType], form.values).split('\n')[0]}
                </Text>
              </Paper>
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Your Details" description="Personal info">
            <Stack gap="md" mt="xl">
              <TextInput
                label="Your Name"
                placeholder="Enter your name"
                required
                {...form.getInputProps('name')}
              />

              <Group grow>
                <TextInput
                  label="Class"
                  placeholder="Enter class"
                  required
                  {...form.getInputProps('class')}
                />
                <TextInput
                  label="Batch"
                  placeholder="Batch - Passout Year"
                  required
                  {...form.getInputProps('batch')}
                />
              </Group>

              <Group grow>
                <TextInput
                  label="Roll Number"
                  placeholder="Enter roll number"
                  {...form.getInputProps('rollNumber')}
                />
                <TextInput
                  label="Student ID"
                  placeholder="Enter student ID"
                  {...form.getInputProps('studentId')}
                />
              </Group>

              <TextInput
                label="Phone Number"
                placeholder="Enter phone number"
                {...form.getInputProps('phone')}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Completed>
            <Stack gap="md" mt="xl">
              <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Letter Preview</Title>
                <Text component="pre" style={{ whiteSpace: 'pre-wrap' }}>
                  {generateLetterBody(letterTypes[letterType], form.values)}
                </Text>
              </Paper>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          {active > 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active < 3 ? (
            <Button onClick={nextStep} rightSection={<IconArrowRight size={16} />}>
              Next step
            </Button>
          ) : (
            <Button
              onClick={downloadPDF}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              leftSection={<IconDownload size={16} />}
            >
              Download PDF
            </Button>
          )}
        </Group>
      </Card>
    </Container>
  );
};

export default LetterTemplate;
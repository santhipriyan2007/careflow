# Software Requirements Specification (SRS)

# CareFlow – Smart Appointment, Lead and Patient Management System

---

# 1. Introduction

## 1.1 Purpose

CareFlow is a web-based Smart Appointment, Lead and Patient Management System developed to assist small clinics in managing appointments, patient records, treatment progress, payments, and customer inquiries efficiently.

The system aims to reduce manual administrative work, minimize missed appointments, improve patient retention, and streamline clinic operations through automation and centralized data management.

---

## 1.2 Scope

CareFlow provides a digital platform that enables clinics to:

* Capture and manage consultation inquiries from potential patients.
* Convert inquiries into registered patients.
* Schedule and manage appointments.
* Send automated reminder emails before appointments.
* Record and monitor patient payments.
* Track treatment progress through visit logs.
* Analyze clinic performance through dashboards and reports.

The system is designed primarily for small and medium-sized healthcare clinics but can be adapted for coaching centers and other service-based organizations.

---

## 1.3 Definitions, Acronyms and Abbreviations

| Term | Description                                                         |
| ---- | ------------------------------------------------------------------- |
| Lead | A potential patient who has shown interest in consulting the clinic |
| CRM  | Customer Relationship Management                                    |
| API  | Application Programming Interface                                   |
| UUID | Universally Unique Identifier                                       |
| MVP  | Minimum Viable Product                                              |

---

# 2. Overall Description

## 2.1 Product Perspective

CareFlow is a standalone web application consisting of:

* Public-facing clinic website
* Administrative dashboard
* Backend API server
* PostgreSQL database hosted on Supabase

---

## 2.2 User Classes and Characteristics

### Receptionist

Responsibilities:

* Manage patient records
* Book appointments
* Update lead status
* Record payments

---

### Doctor

Responsibilities:

* View patient details
* Add treatment notes
* Monitor treatment progress

---

### Administrator

Responsibilities:

* Manage users
* View analytics
* Access reports
* Configure system settings

---

## 2.3 Assumptions and Dependencies

* Users have internet connectivity.
* Clinics maintain patient email addresses.
* Email reminder services remain operational.
* Supabase cloud services are available.

---

# 3. Functional Requirements

## FR1 – Lead Management

The system shall allow receptionists to:

* View consultation requests
* Search leads
* Edit lead details
* Update lead status

Lead statuses include:

* New
* Contacted
* Interested
* Converted
* Lost

---

## FR2 – Patient Management

The system shall allow authorized users to:

* Add new patients
* Edit patient information
* Delete patient records
* Search patients

Patient details include:

* Name
* Email
* Phone Number
* Gender
* Address
* Assigned Doctor

---

## FR3 – Appointment Scheduling

The system shall allow users to:

* Create appointments
* Reschedule appointments
* Cancel appointments
* View upcoming appointments

Recurring appointments should also be supported.

---

## FR4 – Treatment Monitoring

Doctors shall be able to:

* Add visit notes
* Track treatment progress
* View treatment history
* Record observations

---

## FR5 – Payment Tracking

Users shall be able to:

* Record payments
* View payment history
* Check pending balances
* Generate payment receipts

---

## FR6 – Reminder Automation

The system shall automatically check upcoming appointments daily.

If an appointment is scheduled within the next three days, the system shall send a reminder email to the patient.

---

## FR7 – Authentication and Authorization

The system shall provide:

* Secure login functionality
* Password encryption
* Role-based access control

Only authorized users should access restricted modules.

---

# 4. Non-Functional Requirements

## Performance

Dashboard pages should load within three seconds under normal operating conditions.

---

## Security

Passwords shall be encrypted before storage.

Sensitive information shall not be exposed publicly.

---

## Availability

The application should remain accessible 24 hours a day and 7 days a week.

---

## Scalability

The system should support thousands of patients and appointments without significant performance degradation.

---

## Usability

The interface should be intuitive and require minimal technical knowledge.

---

# 5. Technology Stack

## Frontend

* React.js (Vite)
* Tailwind CSS
* JavaScript

---

## Backend

* Node.js
* Express.js

---

## Database

* Supabase PostgreSQL

---

## Additional Tools

* Nodemailer
* Node-cron
* GitHub
* Google Analytics
* Vercel
* Railway

---

# 6. Expected Impact

CareFlow is expected to provide the following benefits:

* Reduced missed appointments
* Improved lead conversion
* Reduced manual reminder calls
* Centralized patient database
* Better financial tracking
* Increased patient retention
* Improved clinic efficiency

---

# 7. Future Enhancements

Possible future improvements include:

* SMS reminders
* WhatsApp notifications
* Online payment gateway integration
* AI-powered appointment prediction
* Patient portal access
* Mobile application support

---

# 8. Conclusion

CareFlow aims to provide a comprehensive digital solution for appointment scheduling, lead management, treatment tracking, and payment monitoring in small clinics. By automating repetitive administrative tasks and centralizing patient information, the system improves operational efficiency and enhances patient engagement.

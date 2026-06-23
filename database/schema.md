Table 1 — Users
Stores login credentials.

users
| Column     | Type      | Constraints               |
| ---------- | --------- | ------------------------- |
| id         | UUID      | Primary Key               |
| name       | TEXT      | NOT NULL                  |
| email      | TEXT      | UNIQUE                    |
| password   | TEXT      | NOT NULL                  |
| role       | TEXT      | admin/doctor/receptionist |
| created_at | TIMESTAMP | Default Now()             |



Table 2 — Leads
People visiting the website.

leads
| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| name           | TEXT      |
| phone          | TEXT      |
| email          | TEXT      |
| service        | TEXT      |
| preferred_date | DATE      |
| status         | TEXT      |
| created_at     | TIMESTAMP |



Table 3 - Doctors

doctors
| Column         | Type |
| -------------- | ---- |
| id             | UUID |
| name           | TEXT |
| specialization | TEXT |
| phone          | TEXT |
| email          | TEXT |



Table 4 - Patients

patients
| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| doctor_id       | UUID      |
| name            | TEXT      |
| email           | TEXT      |
| phone           | TEXT      |
| gender          | TEXT      |
| address         | TEXT      |
| visit_frequency | INTEGER   |
| created_at      | TIMESTAMP |



Table 5 - Treatements

treatments
| Column            | Type    |
| ----------------- | ------- |
| id                | UUID    |
| patient_id        | UUID    |
| treatment_name    | TEXT    |
| total_cost        | DECIMAL |
| start_date        | DATE    |
| expected_end_date | DATE    |
| status            | TEXT    |



Table 6 - Appointments

appointments
| Column           | Type |
| ---------------- | ---- |
| id               | UUID |
| patient_id       | UUID |
| doctor_id        | UUID |
| appointment_date | DATE |
| appointment_time | TIME |
| status           | TEXT |



Table 7 - Payments

payments
| Column         | Type    |
| -------------- | ------- |
| id             | UUID    |
| treatment_id   | UUID    |
| amount         | DECIMAL |
| payment_date   | DATE    |
| payment_method | TEXT    |



Table 8 - Treatment logs

treatment_logs
| Column           | Type    |
| ---------------- | ------- |
| id               | UUID    |
| patient_id       | UUID    |
| visit_number     | INTEGER |
| notes            | TEXT    |
| progress_percent | INTEGER |

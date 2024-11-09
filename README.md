# Classroom Attendance System

## Overview
This project is designed to streamline attendance-taking within a classroom setting, ensuring only students physically present can mark their attendance. By leveraging QR code scanning and a shared hotspot network, the system verifies each student’s presence in the classroom. The process is secure and easy to use for both teachers and students.

## Features
- **QR Code-Based Verification**: The teacher generates a unique QR code for each class session.
- **Hotspot Network Requirement**: Only students connected to the teacher’s hotspot network can mark their attendance.
- **Instant Attendance Marking**: Once scanned, the system immediately marks the student as present.

## System Workflow

### Teacher Setup
- The teacher enables the hotspot on their device and shares the network credentials with students.
- The teacher generates a unique QR code for the class session and displays it.

### Student Check-In
- Students connect to the teacher’s hotspot network.
- Using the attendance app, students scan the QR code displayed by the teacher.
- Upon successful QR code scan and network verification, attendance is marked for the student.

### Verification
- The system confirms that each student is connected to the correct network before allowing attendance to be marked.
- Only students physically in the classroom and connected to the hotspot can successfully complete the attendance check.

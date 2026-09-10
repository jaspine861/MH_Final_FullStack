

import { useEffect, useState } from "react";
import "./AddAppointment.css";
import { createAppointmentBill } from "../../services/appointmentBillService";
import { getDoctors } from "../../services/doctorService";
import { addAppointment } from "../../services/appointmentService";
import AppointmentBillPopup from "./AppointmentBillPopup";
import { getAppointments } from "../../services/appointmentService";
// import RegistrationPaymentPopup from "./RegistrationPaymentPopup";
function AddAppointment({
    patient,
    onClose,
    onAppointmentBooked
}) {

    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [booking, setBooking] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
const [generatedBill, setGeneratedBill] = useState(null);
const [createdAppointment, setCreatedAppointment] = useState(null);
    const [appointmentType, setAppointmentType] =
        useState("Walk-in");

    const [formData, setFormData] = useState({
        patient_id: patient?.patient_id || "",
        patient_name: patient?.full_name || "",
        doctor_id: "",
        doctor_name: "",
        department: "",
        date: "",
        time: "",
        reason: ""
    });


    // Time slots
  const timeSlots = [
    { label: "09:00 AM", value: "09:00:00" },
    { label: "09:30 AM", value: "09:30:00" },
    { label: "10:00 AM", value: "10:00:00" },
    { label: "10:30 AM", value: "10:30:00" },
    { label: "11:00 AM", value: "11:00:00" },
    { label: "11:30 AM", value: "11:30:00" },
    { label: "12:00 PM", value: "12:00:00" },
    { label: "12:30 PM", value: "12:30:00" },
    { label: "02:00 PM", value: "14:00:00" },
    { label: "02:30 PM", value: "14:30:00" },
    { label: "03:00 PM", value: "15:00:00" },
    { label: "03:30 PM", value: "15:30:00" },
    { label: "04:00 PM", value: "16:00:00" },
    { label: "04:30 PM", value: "16:30:00" },
    { label: "05:00 PM", value: "17:00:00" },
    { label: "05:30 PM", value: "17:30:00" }
];


    // Get today's date in YYYY-MM-DD format
    const getToday = () => {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
      // Get date after a specific number of days
const getDateAfterDays = (days) => {

    const date = new Date();

    date.setDate(date.getDate() + days);

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
    // Get the date 2 days from today
const getMaxBookingDate = () => {

    const date = new Date();

    date.setDate(date.getDate() + 2);

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

    // Fetch doctors
    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const data = await getDoctors();

                console.log("DOCTORS:", data);

                setDoctors(data);

            } catch (error) {

                console.error(
                    "Error fetching doctors:",
                    error
                );

            } finally {

                setLoadingDoctors(false);

            }
        };

        fetchDoctors();

    }, []);


    // Set date automatically for Walk-in
    useEffect(() => {

        if (appointmentType === "Walk-in") {

            setFormData((prev) => ({
                ...prev,
                date: getToday(),
                time: ""
            }));

        } else {

            setFormData((prev) => ({
                ...prev,
                date: "",
                time: ""
            }));

        }

    }, [appointmentType]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


   const handleDoctorChange = (e) => {

    const selectedDoctorId = e.target.value;

    const selectedDoctor = doctors.find(
        (doctor) =>
            String(doctor.doctor_id) ===
            String(selectedDoctorId)
    );

    if (!selectedDoctor) {

        setFormData((prev) => ({
            ...prev,
            doctor_id: "",
            doctor_name: "",
            department: ""
        }));

        return;
    }

    setFormData((prev) => ({
        ...prev,
        doctor_id: selectedDoctor.doctor_id,
        doctor_name: selectedDoctor.name,
        department: selectedDoctor.department
    }));
};


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!formData.doctor_id) {

        alert("Please select a doctor.");

        return;
    }


    if (
        appointmentType === "Prior Booking" &&
        !formData.date
    ) {

        alert("Please select an appointment date.");

        return;
    }


    if (!formData.time) {

        alert("Please select a time slot.");

        return;
    }


    if (!paymentMethod) {

        alert("Please select a payment method.");

        return;
    }


    try {

        setBooking(true);

         // Check existing appointments
    const appointments = await getAppointments();

    const alreadyBooked = appointments.some((appointment) => {

        return (
            String(appointment.patient_id) ===
                String(patient.patient_id) &&

            String(appointment.doctor_id) ===
                String(formData.doctor_id) &&

            appointment.date === formData.date
        );

    });

    if (alreadyBooked) {

        alert(
            "This patient already has an appointment with this doctor on this date."
        );

        return;
    }      

        // Find selected doctor
        const selectedDoctor = doctors.find(
            (doctor) =>
                String(doctor.doctor_id) ===
                String(formData.doctor_id)
        );


        if (!selectedDoctor) {

            alert("Doctor details not found.");

            return;
        }


        // 1. Create appointment
        const appointmentData = {

            patient_id: patient.patient_id,

            doctor_id: formData.doctor_id,

            date: formData.date,

            time: formData.time,

            reason: formData.reason

        };


        console.log(
            "SENDING APPOINTMENT:",
            appointmentData
        );


        const newAppointment =
            await addAppointment(
                appointmentData
            );


        console.log(
            "APPOINTMENT CREATED:",
            newAppointment
        );


        // 2. Create appointment bill
      const billData = {

    appointment: newAppointment.id,

    patient_id: patient.patient_id,

    patient_name: patient.full_name,

    doctor_id: selectedDoctor.doctor_id,

    doctor_name: selectedDoctor.name,

    department: selectedDoctor.department,

    appointment_type: appointmentType,

    amount: selectedDoctor.fees,

    payment_status: "paid",

    payment_method: paymentMethod
};


        console.log(
            "APPOINTMENT BILL DATA:",
            billData
        );


        const bill =
            await createAppointmentBill(
                billData
            );


        console.log(
            "APPOINTMENT BILL CREATED:",
            bill
        );


        // // 3. Update parent
        // if (onAppointmentBooked) {

        //     onAppointmentBooked(
        //         newAppointment
        //     );

        // }


        // // 4. Show bill
        // setGeneratedBill(bill);
           // Save appointment temporarily
setCreatedAppointment(newAppointment);

// Show bill popup
setGeneratedBill(bill);

    } catch (error) {

        console.error(
            "ERROR BOOKING APPOINTMENT:",
            error.response?.data ||
            error
        );

        alert(
            "Failed to create appointment and bill."
        );

    } finally {

        setBooking(false);

    }

};


    return (

        <div className="appointment-overlay">

            <div className="appointment-card">


                {/* Header */}

                <div className="appointment-header">

                    <div>

                        <h2>
                            Book Appointment
                        </h2>

                        <p>
                            Schedule an appointment for the patient
                        </p>

                    </div>


                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>


                    <div className="appointment-form">


                        {/* Appointment Type */}

                        <div className="form-group full-width">

                            <label>
                                Appointment Type
                            </label>

                            <select
                                value={appointmentType}
                                onChange={(e) =>
                                    setAppointmentType(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="Walk-in">
                                    Walk-in
                                </option>

                                <option value="Prior Booking">
                                    Prior Booking
                                </option>

                            </select>

                        </div>


                        {/* Patient ID */}

                        <div className="form-group">

                            <label>
                                Patient ID
                            </label>

                            <input
                                type="text"
                                value={`P${String(
                                    formData.patient_id
                                ).padStart(3, "0")}`}
                                readOnly
                            />

                        </div>


                        {/* Patient Name */}

                        <div className="form-group">

                            <label>
                                Patient Name
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.patient_name
                                }
                                readOnly
                            />

                        </div>


                        {/* Doctor */}

                        <div className="form-group">

                            <label>
                                Doctor
                            </label>

                            <select
                                name="doctor_id"
                                value={
                                    formData.doctor_id
                                }
                                onChange={
                                    handleDoctorChange
                                }
                                required
                            >

                                <option value="">

                                    {loadingDoctors
                                        ? "Loading doctors..."
                                        : "Select Doctor"}

                                </option>


                                {doctors.map(
                                    (doctor) => (

                                        <option
                                            key={
                                                doctor.doctor_id
                                            }
                                            value={
                                                doctor.doctor_id
                                            }
                                        >

                                            {doctor.name}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* Department */}

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <input
                                type="text"
                                value={
                                    formData.department
                                }
                                placeholder="Department"
                                readOnly
                            />

                        </div>


                        {/* Date */}

                        <div className="form-group">

                            <label>
                                Appointment Date
                            </label>


                            {appointmentType ===
                            "Walk-in" ? (

                                <input
                                    type="date"
                                    value={
                                        formData.date
                                    }
                                    readOnly
                                />

                            ) : (

                                // <input
                                //     type="date"
                                //     name="date"
                                //     value={
                                //         formData.date
                                //     }
                                //     onChange={
                                //         handleChange
                                //     }
                                //     min={getToday()}
                                //     required
                                // />
                                    <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    min={getDateAfterDays(1)}
    max={getDateAfterDays(2)}
    required
/>
                            )}

                        </div>


                        {/* Time Slot */}

                        <div className="form-group">

                            <label>
                                Time Slot
                            </label>

                            <select
                                name="time"
                                value={
                                    formData.time
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select Time Slot
                                </option>


                               {timeSlots.map((slot) => (
    <option
        key={slot.value}
        value={slot.value}
    >
        {slot.label}
    </option>
))}

                            </select>

                        </div>


                        {/* Reason */}

                        <div className="form-group full-width">

                            <label>
                                Reason for Visit
                            </label>

                            <textarea
                                name="reason"
                                value={
                                    formData.reason
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter reason for appointment..."
                                rows="4"
                                required
                            />

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="appointment-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={booking}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="book-button"
                            disabled={booking}
                        >

                            {booking
                                ? "Booking..."
                                : appointmentType ===
                                  "Walk-in"
                                    ? "Create Walk-in"
                                    : "Book Appointment"}

                        </button>

                    </div>

                 <div className="form-group full-width">

    <label>
        Payment Method
    </label>

    <select
        value={paymentMethod}
        onChange={(e) =>
            setPaymentMethod(e.target.value)
        }
        required
    >

        <option value="">
            Select Payment Method
        </option>

        <option value="Cash">
            Cash
        </option>

        <option value="UPI">
            UPI
        </option>

        <option value="Card">
            Card
        </option>

        <option value="Net Banking">
            Net Banking
        </option>

    </select>

</div>
                </form>

            </div>
             {/* {generatedBill && (

    <AppointmentBillPopup

        bill={generatedBill}

        onClose={() => {

            setGeneratedBill(null);

            onClose();

        }}

    />

)} */}
{generatedBill && (

    <AppointmentBillPopup

        bill={generatedBill}

        onClose={() => {

            setGeneratedBill(null);

            if (onAppointmentBooked && createdAppointment) {

                onAppointmentBooked(createdAppointment);

            }

            onClose();

        }}

    />

)}

        </div>

    );

}

export default AddAppointment;

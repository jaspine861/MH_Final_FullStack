from django.db import models


class Patient(models.Model):

    patient_id = models.AutoField(primary_key=True)

    full_name = models.CharField(max_length=150)

    date_of_birth = models.DateField()

    gender = models.CharField(
        max_length=10,
        choices=[
            ("Male", "Male"),
            ("Female", "Female"),
            ("Other", "Other"),
        ]
    )

    phone = models.CharField(max_length=15)

    email = models.EmailField(
        blank=True,
        null=True
    )

    blood_group = models.CharField(
        max_length=5,
        blank=True,
        null=True
    )

    address = models.TextField()

    emergency_contact = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    allergies = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ("Active", "Active"),
            ("Admitted", "Admitted"),
            ("Discharged", "Discharged"),
        ],
        default="Active"
    )

    registered_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

# class Appointment(models.Model):

#     STATUS_CHOICES = [
#         ("Booked", "Booked"),
#         ("Consulted", "Consulted"),
#         ("Cancelled", "Cancelled"),
#     ]

#     # Appointment ID
#     appointment_id = models.CharField(
#         max_length=20,
#         unique=True,
#         editable=False
#     )

#     # Patient
#     patient_id = models.CharField(
#         max_length=20
#     )

#     # Doctor
#     doctor_id = models.CharField(
#         max_length=20
#     )

#     # Token
#     token_no = models.PositiveIntegerField()

#     # Appointment details
#     date = models.DateField()
#     time = models.TimeField()

#     reason = models.TextField()

#     status = models.CharField(
#         max_length=20,
#         choices=STATUS_CHOICES,
#         default="Booked"
#     )

#     # Optional additional information
#     notes = models.TextField(
#         blank=True,
#         null=True
#     )

#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     updated_at = models.DateTimeField(
#         auto_now=True
#     )

#     def save(self, *args, **kwargs):

#         if not self.appointment_id:

#             last_appointment = Appointment.objects.order_by("-id").first()

#             if last_appointment:
#                 next_id = last_appointment.id + 1
#             else:
#                 next_id = 1

#             self.appointment_id = f"APT{next_id:03d}"

#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.appointment_id} - {self.patient_id} - {self.doctor_id}"

class Appointment(models.Model):

    STATUS_CHOICES = [
        ("Booked", "Booked"),
        ("Consulted", "Consulted"),
        ("Cancelled", "Cancelled"),
    ]

    appointment_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )

    patient_id = models.CharField(
        max_length=20
    )

    doctor_id = models.CharField(
        max_length=20
    )

    token_no = models.PositiveIntegerField(
        editable=False
    )

    date = models.DateField()
    time = models.TimeField()

    reason = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Booked"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):

        # Generate Appointment ID
        if not self.appointment_id:

            last_appointment = Appointment.objects.order_by("-id").first()

            if last_appointment:
                next_id = last_appointment.id + 1
            else:
                next_id = 1

            self.appointment_id = f"APT{next_id:03d}"

        # Generate Token Number for the selected date
        if not self.token_no:

            last_token = Appointment.objects.filter(
                date=self.date
            ).order_by("-token_no").first()

            if last_token:
                self.token_no = last_token.token_no + 1
            else:
                self.token_no = 1

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.appointment_id} - {self.patient_id} - {self.doctor_id}"

class AppointmentBill(models.Model):

    PAYMENT_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
    ]

    PAYMENT_METHOD_CHOICES = [
        ("Cash", "Cash"),
        ("UPI", "UPI"),
        ("Card", "Card"),
        ("Net Banking", "Net Banking"),
    ]

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.CASCADE,
        related_name="appointment_bills"
    )

    patient_id = models.IntegerField()

    patient_name = models.CharField(
        max_length=150
    )

    doctor_id = models.CharField(
        max_length=20
    )

    doctor_name = models.CharField(
        max_length=150
    )

    department = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    appointment_type = models.CharField(
        max_length=30
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="paid"
    )

    payment_method = models.CharField(
        max_length=30,
        choices=PAYMENT_METHOD_CHOICES
    )

    bill_date = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"APPT-BILL{self.id:03d}"
from rest_framework import serializers
from doctor.models import Consultation,PrescribedLab,Doctor,Bill,LabBill
from administrator.models import UserProfile,Staff,Medicine,LabTest,Department
from receptionist.models import Patient,Appointment,AppointmentBill
from doctor.models import ( Consultation, PrescribedLab, PrescribedMedicine )
# class ConsultationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Consultation
#         fields="__all__"

# class PrescribedLabSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=PrescribedLab
#         fields="__all__"

#administrator
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields="__all__"

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"
class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = "__all__"

#receptionist
class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = "__all__"

# class AppointmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Appointment
#         fields = "__all__"

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = "__all__"

        read_only_fields = [
            "appointment_id",
            "token_no",
            "status",
            "created_at",
            "updated_at",
        ]

class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = [
            "medicine_id",
            "medicine_name",
            "medicine_type",
            "manufacturer_name",
            "manufacture_date",
            "expiry_date",
            "price_per_unit",
            "stock_quantity",
            "quantity",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "medicine_id",
            "quantity",
            "created_at",
            "updated_at",
        ]

class LabTestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabTest
        fields = [
            "test_id",
            "test_name",
            "normal_range",
            "sample_required",
            "unit",
            "department",
            "tat",
            "price",
            "description",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "test_id",
            "created_at",
            "updated_at",
        ]
class PrescribedMedicineSerializer(serializers.ModelSerializer):

    patient_id = serializers.IntegerField(
        source="consultation.patient_id",
        read_only=True
    )

    doctor_id = serializers.CharField(
        source="consultation.doctor_id",
        read_only=True
    )

    consultation_id = serializers.IntegerField(
        source="consultation.consultation_id",
        read_only=True
    )

    stock_quantity = serializers.SerializerMethodField()

    def get_stock_quantity(self, obj):
        try:
            medicine = Medicine.objects.get(
                medicine_id=obj.medicine_id
            )
            return medicine.stock_quantity
        except Medicine.DoesNotExist:
            return 0

    class Meta:
        model = PrescribedMedicine

        fields = [
            "prescription_id",
            "consultation_id",
            "medicine_id",
            "medicine_name",
            "price",
            "stock_quantity",
            "dosage",
            "morning",
            "afternoon",
            "night",
            "food_timing",
            "duration",
            "patient_id",
            "doctor_id",
            "status",
        ]
# class PrescribedMedicineSerializer(serializers.ModelSerializer):

#     patient_id = serializers.IntegerField(
#         source="consultation.patient_id",
#         read_only=True
#     )

#     doctor_id = serializers.CharField(
#         source="consultation.doctor_id",
#         read_only=True
#     )

#     class Meta:
#         model = PrescribedMedicine
#         fields = [
#             "prescription_id",
#             "medicine_id",
#             "medicine_name",
#             "dosage",
#             "morning",
#             "afternoon",
#             "night",
#             "food_timing",
#             "duration",
#             "patient_id",
#             "doctor_id",
#             "status",
#         ]

# class PrescribedMedicineSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PrescribedMedicine
#         fields = [
#             "prescription_id",
#             "consultation_id",
#             "medicine_id",
#             "medicine_name",
#             "dosage",
#             "morning",
#             "afternoon",
#             "night",
#             "food_timing",
#             "duration",
#         ]

#         read_only_fields = [
#             "prescription_id",
#             "consultation_id",
#         ]

# class PrescribedLabSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PrescribedLab

#         fields = [
#             "lab_prescription_id",
#             "test_id",
#             "test_name",
#         ]

#         read_only_fields = [
#             "lab_prescription_id",
#             "test_name",
#         ]

# class PrescribedLabSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PrescribedLab
#         fields = [
#             "lab_prescription_id",
#             "consultation_id",
#             "test_id",
#             "test_name",
#             "status",
#         ]

#         read_only_fields = [
#             "lab_prescription_id",
#             "consultation_id",
#         ]

class PrescribedLabSerializer(serializers.ModelSerializer):

    patient_id = serializers.IntegerField(
        source="consultation.patient_id",
        read_only=True
    )

    patient_name = serializers.SerializerMethodField()

    doctor_id = serializers.CharField(
        source="consultation.doctor_id",
        read_only=True
    )

    doctor_name = serializers.SerializerMethodField()

    report_date = serializers.DateField(
        source="consultation.consultation_date",
        read_only=True
    )

    class Meta:
        model = PrescribedLab

        fields = [
            "lab_prescription_id",
            "test_id",
            "test_name",

            "status",

            "patient_id",
            "patient_name",

            "doctor_id",
            "doctor_name",

            "results",
            "technician_notes",
            "report_date",
        ]

        read_only_fields = [
            "lab_prescription_id",
            "test_name",
            "patient_id",
            "patient_name",
            "doctor_id",
            "doctor_name",
            "report_date",
        ]

    def get_patient_name(self, obj):

        if not obj.consultation:
            return None

        patient = Patient.objects.filter(
            patient_id=obj.consultation.patient_id
        ).first()

        if patient:
            return patient.full_name

        return None

    def get_doctor_name(self, obj):

        if not obj.consultation:
            return None

        doctor = Doctor.objects.filter(
            doctor_id=obj.consultation.doctor_id
        ).first()

        if doctor:
            return doctor.name

        return None
        
# class ConsultationSerializer(serializers.ModelSerializer):

#     prescribed_medicines = PrescribedMedicineSerializer(
#         many=True,
#         required=False
#     )

#     prescribed_tests = PrescribedLabSerializer(
#         many=True,
#         required=False
#     )

#     class Meta:
#         model = Consultation

#         fields = [
#             "consultation_id",
#             "appointment",
#             "patient_id",
#             "doctor_id",
#             "symptoms",
#             "diagnosis",
#             "doctor_notes",
#             "medical_advice",
#             "consultation_date",
#             "follow_up_date",
#             "notes",
#             "prescribed_medicines",
#             "prescribed_tests",
#         ]

#         read_only_fields = [
#             "consultation_id"
#         ]

#     def create(self, validated_data):

#         medicines_data = validated_data.pop(
#             "prescribed_medicines",
#             []
#         )

#         tests_data = validated_data.pop(
#             "prescribed_tests",
#             []
#         )

#         consultation = Consultation.objects.create(
#             **validated_data
#         )

#         # Save medicines
#         # for medicine_data in medicines_data:

#         #     PrescribedMedicine.objects.create(
#         #         consultation=consultation,
#         #         **medicine_data
#         #     )
#         # Save medicines
#         for medicine_data in medicines_data:

#             medicine_id = medicine_data.get("medicine_id")

#             medicine = Medicine.objects.get(
#                 medicine_id=medicine_id
#             )

#             # PrescribedMedicine.objects.create(
#             #     consultation=consultation,
#             #     medicine_id=medicine.medicine_id,
#             #     medicine_name=medicine.medicine_name,
#             #     price=medicine.price_per_unit,
#             #     dosage=medicine_data.get("dosage"),
#             #     morning=medicine_data.get("morning", False),
#             #     afternoon=medicine_data.get("afternoon", False),
#             #     night=medicine_data.get("night", False),
#             #     food_timing=medicine_data.get("food_timing"),
#             #     duration=medicine_data.get("duration"),
#             # )
#             PrescribedMedicine.objects.create(
#                 consultation=consultation,
#                 medicine_id=medicine.medicine_id,
#                 medicine_name=medicine.medicine_name,
#                 price=medicine.price_per_unit,
#                 quantity=medicine_data.get("quantity", 1),
#                 dosage=medicine_data.get("dosage"),
#                 morning=medicine_data.get("morning", False),
#                 afternoon=medicine_data.get("afternoon", False),
#                 night=medicine_data.get("night", False),
#                 food_timing=medicine_data.get("food_timing"),
#                 duration=medicine_data.get("duration"),
#             )
#         # Save lab tests
#         for test_data in tests_data:

#             test = LabTest.objects.get(
#                 test_id=test_data["test_id"]
#             )

#             PrescribedLab.objects.create(
#                 consultation=consultation,
#                 test_id=test.test_id,
#                 test_name=test.test_name
#             )

#         return consultation
#     # class ConsultationSerializer(serializers.ModelSerializer):

#     #     prescribed_medicines = PrescribedMedicineSerializer(
#     #         many=True,
#     #         required=False
#     #     )

#     #     prescribed_tests = PrescribedLabSerializer(
#     #         many=True,
#     #         required=False
#     #     )

#     #     class Meta:
#     #         model = Consultation
#     #         fields = [
#     #             "consultation_id",
#     #             "appointment",
#     #             "patient_id",
#     #             "doctor_id",
#     #             "symptoms",
#     #             "diagnosis",
#     #             "doctor_notes",
#     #             "medical_advice",
#     #             "consultation_date",
#     #             "follow_up_date",
#     #             "notes",
#     #             "prescribed_medicines",
#     #             "prescribed_tests",
#     #         ]

#     #         read_only_fields = [
#     #             "consultation_id"
#     #         ]

#     #     def create(self, validated_data):

#     #         medicines_data = validated_data.pop(
#     #             "prescribed_medicines",
#     #             []
#     #         )

#     #         tests_data = validated_data.pop(
#     #             "prescribed_tests",
#     #             []
#     #         )

#     #         consultation = Consultation.objects.create(
#     #             **validated_data
#     #         )

#     #         # Create medicines
#     #         for medicine_data in medicines_data:

#     #             PrescribedMedicine.objects.create(
#     #                 consultation_id=consultation.consultation_id,
#     #                 **medicine_data
#     #             )

#     #         # Create tests
#     #         for test_data in tests_data:

#     #             PrescribedLab.objects.create(
#     #                 consultation_id=consultation.consultation_id,
#     #                 **test_data
#     #             )

#     #         return consultation

class ConsultationSerializer(serializers.ModelSerializer):

    prescribed_medicines = PrescribedMedicineSerializer(
        many=True,
        required=False
    )

    prescribed_tests = PrescribedLabSerializer(
        many=True,
        required=False
    )

    class Meta:
        model = Consultation

        fields = [
            "consultation_id",
            "appointment",
            "patient_id",
            "doctor_id",
            "symptoms",
            "diagnosis",
            "doctor_notes",
            "medical_advice",
            "consultation_date",
            "follow_up_date",
            "notes",
            "prescribed_medicines",
            "prescribed_tests",
        ]

        read_only_fields = [
            "consultation_id"
        ]

    def create(self, validated_data):

        medicines_data = validated_data.pop(
            "prescribed_medicines",
            []
        )

        tests_data = validated_data.pop(
            "prescribed_tests",
            []
        )

        # =========================================
        # CREATE CONSULTATION
        # =========================================

        consultation = Consultation.objects.create(
            **validated_data
        )

        # =========================================
        # SAVE PRESCRIBED MEDICINES
        # =========================================

        for medicine_data in medicines_data:

            medicine_id = medicine_data.get("medicine_id")

            # Get actual medicine from Medicine table
            try:
                medicine = Medicine.objects.get(
                    medicine_id=medicine_id
                )
            except Medicine.DoesNotExist:
                raise serializers.ValidationError({
                    "medicine_id":
                        f"Medicine {medicine_id} does not exist."
                })

            # -----------------------------------------
            # DOSAGE
            # -----------------------------------------

            try:
                dosage = int(
                    medicine_data.get("dosage", 1)
                )
            except (TypeError, ValueError):
                raise serializers.ValidationError({
                    "dosage":
                        "Dosage must be a valid number."
                })

            if dosage <= 0:
                raise serializers.ValidationError({
                    "dosage":
                        "Dosage must be greater than 0."
                })

            # -----------------------------------------
            # NUMBER OF TIMES PER DAY
            # -----------------------------------------

            morning = medicine_data.get(
                "morning",
                False
            )

            afternoon = medicine_data.get(
                "afternoon",
                False
            )

            night = medicine_data.get(
                "night",
                False
            )

            times_per_day = sum([
                bool(morning),
                bool(afternoon),
                bool(night)
            ])

            if times_per_day == 0:
                raise serializers.ValidationError({
                    "medicine":
                        f"Select at least one medication time "
                        f"for {medicine.medicine_name}."
                })

            # -----------------------------------------
            # DURATION
            # -----------------------------------------

            try:
                duration = int(
                    medicine_data.get("duration", 1)
                )
            except (TypeError, ValueError):
                raise serializers.ValidationError({
                    "duration":
                        "Duration must be a valid number of days."
                })

            if duration <= 0:
                raise serializers.ValidationError({
                    "duration":
                        "Duration must be greater than 0."
                })

            # -----------------------------------------
            # CALCULATE TOTAL QUANTITY
            # -----------------------------------------

            quantity = (
                dosage *
                times_per_day *
                duration
            )

            # -----------------------------------------
            # CHECK STOCK
            # -----------------------------------------

            if medicine.stock_quantity < quantity:
                raise serializers.ValidationError({
                    "stock":
                        f"Insufficient stock for "
                        f"{medicine.medicine_name}. "
                        f"Available: {medicine.stock_quantity}, "
                        f"Required: {quantity}"
                })

            # -----------------------------------------
            # CREATE PRESCRIPTION
            # -----------------------------------------

            PrescribedMedicine.objects.create(

                consultation=consultation,

                medicine_id=medicine.medicine_id,

                medicine_name=medicine.medicine_name,

                price=medicine.price_per_unit,

                quantity=quantity,

                dosage=str(dosage),

                morning=morning,

                afternoon=afternoon,

                night=night,

                food_timing=medicine_data.get(
                    "food_timing"
                ),

                duration=str(duration),

            )

        # =========================================
        # SAVE PRESCRIBED LAB TESTS
        # =========================================

        for test_data in tests_data:

            try:
                test = LabTest.objects.get(
                    test_id=test_data["test_id"]
                )
            except LabTest.DoesNotExist:
                raise serializers.ValidationError({
                    "test_id":
                        f"Test {test_data['test_id']} does not exist."
                })

            PrescribedLab.objects.create(
                consultation=consultation,

                test_id=test.test_id,

                test_name=test.test_name
            )

        return consultation

class PatientHistorySerializer(serializers.Serializer):

    consultations = serializers.SerializerMethodField()

    lab_reports = serializers.SerializerMethodField()

    def get_consultations(self, obj):

        consultations = Consultation.objects.filter(
            patient_id=obj
        ).order_by("-consultation_date", "-consultation_id")

        return ConsultationSerializer(
            consultations,
            many=True,
            context=self.context
        ).data

    def get_lab_reports(self, obj):

        reports = PrescribedLab.objects.filter(
            consultation__patient_id=obj
        ).order_by(
            "-consultation__consultation_date",
            "-lab_prescription_id"
        )

        return PrescribedLabSerializer(
            reports,
            many=True,
            context=self.context
        ).data

# class BillSerializer(serializers.ModelSerializer):

#     consultation_id = serializers.PrimaryKeyRelatedField(
#         source="consultation",
#         queryset=Consultation.objects.all()
#     )

#     class Meta:
#         model = Bill

#         fields = [
#             "bill_id",
#             "consultation_id",
#             "patient_id",
#             "amount",
#             "payment_status",
#             "payment_method",
#             "bill_date",
#         ]
class BillSerializer(serializers.ModelSerializer):

    consultation_id = serializers.PrimaryKeyRelatedField(
        source="consultation",
        queryset=Consultation.objects.all()
    )

    class Meta:
        model = Bill

        fields = [
            "bill_id",
            "consultation_id",
            "patient_id",
            "amount",
            "payment_status",
            "payment_method",
            "bill_date",
        ]

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department

        fields = [
            "department_id",
            "name",
            "description",
            "is_active",
        ]

        read_only_fields = [
            "department_id",
        ]

class LabBillSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabBill

        fields = [
            "lab_bill_id",
            "lab_prescription_id",
            "patient_id",
            "patient_name",
            "doctor_id",
            "doctor_name",
            "test_name",
            "description",
            "amount",
            "payment_status",
            "payment_method",
            "bill_date",
        ]

        read_only_fields = [
            "lab_bill_id",
            "bill_date",
        ]

class AppointmentBillSerializer(serializers.ModelSerializer):

    appointment_date = serializers.DateField(
        source="appointment.date",
        read_only=True
    )

    appointment_time = serializers.TimeField(
        source="appointment.time",
        read_only=True
    )

    appointment_number = serializers.CharField(
        source="appointment.appointment_id",
        read_only=True
    )

    class Meta:
        model = AppointmentBill

        fields = [
            "id",
            "appointment",
            "appointment_number",
            "appointment_date",
            "appointment_time",
            "patient_id",
            "patient_name",
            "doctor_id",
            "doctor_name",
            "department",
            "appointment_type",
            "amount",
            "payment_status",
            "payment_method",
            "bill_date",
        ]

        read_only_fields = [
            "id",
            "appointment_number",
            "appointment_date",
            "appointment_time",
            "bill_date",
        ]
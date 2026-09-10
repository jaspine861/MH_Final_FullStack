# from django.shortcuts import render
# from django.http import JsonResponse
from doctor.models import Consultation,PrescribedLab,Doctor,PrescribedMedicine
from receptionist.models import Patient ,Appointment,AppointmentBill
from .serializers import PatientHistorySerializer,AppointmentBillSerializer,LabBillSerializer,DepartmentSerializer,BillSerializer,PrescribedMedicineSerializer,LabTestSerializer,MedicineSerializer,AppointmentSerializer,ConsultationSerializer,UserSerializer,PrescribedLabSerializer,PatientSerializer, StaffSerializer,DoctorSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from administrator.models import User,Staff,Medicine,LabTest,Department
from django.http import Http404
from rest_framework import mixins,generics
from doctor.models import Consultation,Bill,LabBill
from rest_framework import viewsets
from django.db import transaction
# Create your views here.

@api_view(['GET','POST'])
def cmsView(request):
    if request.method=='GET':
        consultation=Consultation.objects.all()
        serializer=ConsultationSerializer(consultation,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif request.method=='POST':
        serializer=ConsultationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def consultationDetailView(request,pk):
    try:
        consultation=Consultation.objects.get(pk=pk)
    except Consultation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer= ConsultationSerializer(consultation)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer =ConsultationSerializer(consultation,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method=='DELETE':
        consultation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#administrator

class UserView(APIView):
    def get(self,request):
        user = User.objects.all()
        serializer =  UserSerializer(user,many=True)   
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    def get_object(self,pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        user = self.get_object(pk)
        serializer=UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,pk):
        user = self.get_object(pk)
        serializer=UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        user=self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StaffListCreateView(generics.ListCreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class StaffDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class PrescribedLabView(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset=PrescribedLab.objects.all()
    serializer_class = PrescribedLabSerializer

    def get(self,request):
        return self.list(request)

    def post(self,request):
        return self.create(request)

class PrescribedLabDetailView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView
       ):
    queryset = PrescribedLab.objects.all()
    serializer_class = PrescribedLabSerializer

    def get(self, request, pk):
        return self.retrieve(request, pk)

    def patch(self, request, pk):
        return self.partial_update(request, pk)

#receptionist
class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorListCreateView(generics.ListCreateAPIView):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer


class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer

# class LoginView(APIView):

#     def post(self, request):

#         username = request.data.get("username")
#         password = request.data.get("password")

#         # Check Doctor
#         try:
#             doctor = Doctor.objects.get(username=username)

#             if doctor.password == password:

#                 return Response({
#                     "id": doctor.id,
#                     "name": doctor.name,
#                     "role": "doctor",
#                     "doctor_id": doctor.doctor_id
#                 })

#         except Doctor.DoesNotExist:
#             pass


#         # Check Staff
#         try:
#             staff = Staff.objects.get(username=username)
#             staff = Staff.objects.get(username=username,is_active=True)

#             if staff.password == password:

#                 return Response({
#                     "id": staff.id,
#                     "name": staff.name,
#                     "role": staff.department.lower(),
#                     "staff_id": staff.staff_id
#                 })

#         except Staff.DoesNotExist:
#             pass


#         return Response(
#             {"message": "Invalid username or password"},
#             status=401
#         )

class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        # Check Doctor
        try:
            doctor = Doctor.objects.get(username=username)

            if doctor.password == password:

                return Response({
                    "id": doctor.id,
                    "name": doctor.name,
                    "role": "doctor",
                    "doctor_id": doctor.doctor_id
                })

            return Response(
                {"message": "Invalid username or password"},
                status=401
            )

        except Doctor.DoesNotExist:
            pass


        # Check Staff
        try:
            staff = Staff.objects.get(
                username=username,
                is_active=True
            )

            if staff.password == password:

                return Response({
                    "id": staff.id,
                    "name": staff.name,
                    "role": staff.department.lower(),
                    "staff_id": staff.staff_id
                })

            return Response(
                {"message": "Invalid username or password"},
                status=401
            )

        except Staff.DoesNotExist:
            pass


        return Response(
            {"message": "Invalid username or password"},
            status=401
        )

class AppointmentListCreateView(generics.ListCreateAPIView):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer

class MedicineListCreateView(generics.ListCreateAPIView):
    queryset = Medicine.objects.all().order_by("-id")
    serializer_class = MedicineSerializer


class MedicineDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    lookup_field = "medicine_id"

class LabTestListCreateView(generics.ListCreateAPIView):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer


class LabTestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer
    lookup_field = "pk"

class ConsultationViewSet(viewsets.ModelViewSet):

    queryset = Consultation.objects.all().order_by("-consultation_id")
    serializer_class = ConsultationSerializer

    def get_queryset(self):

        queryset = Consultation.objects.all().order_by(
            "-consultation_id"
        )

        appointment_id = self.request.query_params.get(
            "appointment"
        )

        if appointment_id:
            queryset = queryset.filter(
                appointment=appointment_id
            )

        return queryset
    def create(self, request, *args, **kwargs):

        print("CONSULTATION REQUEST DATA:")
        print(request.data)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            consultation = serializer.save()

            # Get appointment ID from consultation
            appointment_id = consultation.appointment

            try:
                appointment = Appointment.objects.get(
                    appointment_id=appointment_id
                )

                appointment.status = "Consulted"
                appointment.save(update_fields=["status"])

                print(
                    f"Appointment {appointment_id} status updated to Consulted"
                )

            except Appointment.DoesNotExist:

                print(
                    f"Appointment {appointment_id} not found"
                )

            response_serializer = self.get_serializer(
                consultation
            )

            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED
            )

        print("CONSULTATION VALIDATION ERROR:")
        print(serializer.errors)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # def create(self, request, *args, **kwargs):

    #     print("CONSULTATION REQUEST DATA:")
    #     print(request.data)

    #     serializer = self.get_serializer(
    #         data=request.data
    #     )

    #     if serializer.is_valid():

    #         consultation = serializer.save()

    #         response_serializer = self.get_serializer(
    #             consultation
    #         )

    #         return Response(
    #             response_serializer.data,
    #             status=status.HTTP_201_CREATED
    #         )

    #     print("CONSULTATION VALIDATION ERROR:")
    #     print(serializer.errors)

    #     return Response(
    #         serializer.errors,
    #         status=status.HTTP_400_BAD_REQUEST
    #     )

class PrescribedMedicineListView(generics.ListAPIView):
    queryset = PrescribedMedicine.objects.all()
    serializer_class = PrescribedMedicineSerializer

class PrescribedMedicineDetailView(
    generics.RetrieveUpdateAPIView
     ):
    queryset = PrescribedMedicine.objects.all()
    serializer_class = PrescribedMedicineSerializer

class PrescribedMedicineByConsultationView(generics.ListAPIView):

    serializer_class = PrescribedMedicineSerializer

    def get_queryset(self):
        consultation_id = self.kwargs["consultation_id"]

        return PrescribedMedicine.objects.filter(
            consultation_id=consultation_id
        )


# class BillListCreateView(generics.ListCreateAPIView):

#     queryset = Bill.objects.all()
#     serializer_class = BillSerializer
class BillListCreateView(generics.ListCreateAPIView):

    queryset = Bill.objects.all()
    serializer_class = BillSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):

        consultation_id = request.data.get("consultation_id")
        patient_id = request.data.get("patient_id")
        payment_method = request.data.get("payment_method")

        if not consultation_id:
            return Response(
                {"error": "consultation_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not payment_method:
            return Response(
                {"error": "payment_method is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get prescribed medicines
        medicines = PrescribedMedicine.objects.filter(
            consultation_id=consultation_id,
            status="pending"
        )

        if not medicines.exists():
            return Response(
                {"error": "No pending medicines found."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check stock first
        for prescribed in medicines:

            try:
                medicine = Medicine.objects.get(
                    medicine_id=prescribed.medicine_id
                )
            except Medicine.DoesNotExist:
                return Response(
                    {
                        "error":
                        f"Medicine {prescribed.medicine_id} not found."
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            if medicine.stock_quantity < prescribed.quantity:
                return Response(
                    {
                        "error":
                        f"Insufficient stock for "
                        f"{medicine.medicine_name}. "
                        f"Available: {medicine.stock_quantity}, "
                        f"Required: {prescribed.quantity}"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Calculate total from database
        total_amount = 0

        for prescribed in medicines:

            medicine = Medicine.objects.get(
                medicine_id=prescribed.medicine_id
            )

            total_amount += (
                medicine.price_per_unit *
                prescribed.quantity
            )

        # Create bill
        bill = Bill.objects.create(
            consultation_id=consultation_id,
            patient_id=patient_id,
            amount=total_amount,
            payment_status="paid",
            payment_method=payment_method
        )

        # Reduce stock + mark completed
        for prescribed in medicines:

            medicine = Medicine.objects.get(
                medicine_id=prescribed.medicine_id
            )

            medicine.stock_quantity -= prescribed.quantity

            medicine.save(
                update_fields=["stock_quantity"]
            )

            prescribed.status = "completed"

            prescribed.save(
                update_fields=["status"]
            )

        serializer = self.get_serializer(bill)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

class BillDetailView(generics.RetrieveAPIView):

    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class DepartmentListCreateView(generics.ListCreateAPIView):

    queryset = Department.objects.all().order_by("department_id")
    serializer_class = DepartmentSerializer

class DepartmentDetailView(generics.RetrieveUpdateAPIView):

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    lookup_field = "department_id"

class LabBillViewSet(viewsets.ModelViewSet):

    queryset = LabBill.objects.all().order_by("-bill_date")

    serializer_class = LabBillSerializer

    def create(self, request, *args, **kwargs):

        lab_prescription_id = request.data.get(
            "lab_prescription_id"
        )

        payment_method = request.data.get(
            "payment_method"
        )

        if not lab_prescription_id:
            return Response(
                {
                    "error": "lab_prescription_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not payment_method:
            return Response(
                {
                    "error": "payment_method is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get prescribed lab
        prescribed_lab = PrescribedLab.objects.filter(
            lab_prescription_id=lab_prescription_id
        ).first()

        if not prescribed_lab:
            return Response(
                {
                    "error": "Lab prescription not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Get consultation
        consultation = prescribed_lab.consultation

        if not consultation:
            return Response(
                {
                    "error": "Consultation not found."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get patient
        patient = Patient.objects.filter(
            patient_id=consultation.patient_id
        ).first()

        if not patient:
            return Response(
                {
                    "error": "Patient not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Get doctor
        doctor = Doctor.objects.filter(
            doctor_id=consultation.doctor_id
        ).first()

        # Get laboratory test
        lab_test = LabTest.objects.filter(
            test_id=prescribed_lab.test_id
        ).first()

        if not lab_test:
            return Response(
                {
                    "error": "Laboratory test not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Create bill
        bill = LabBill.objects.create(
            lab_prescription_id=prescribed_lab.lab_prescription_id,

            patient_id=patient.patient_id,

            patient_name=patient.full_name,

            doctor_id=doctor.doctor_id if doctor else None,

            doctor_name=doctor.name if doctor else None,

            test_name=lab_test.test_name,

            description=lab_test.description,

            amount=lab_test.price,

            payment_status="paid",

            payment_method=payment_method
        )

        serializer = self.get_serializer(bill)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
class AppointmentBillViewSet(viewsets.ModelViewSet):

    queryset = AppointmentBill.objects.all().order_by("-bill_date")

    serializer_class = AppointmentBillSerializer

class PatientHistoryView(APIView):

    def get(self, request, patient_id):

        print("PATIENT HISTORY REQUEST:", patient_id)

        patient_exists = Patient.objects.filter(
            patient_id=patient_id
        ).exists()

        print("PATIENT EXISTS:", patient_exists)

        if not patient_exists:

            return Response(
                {
                    "detail": "Patient not found.",
                    "patient_id": patient_id
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PatientHistorySerializer(
            patient_id
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
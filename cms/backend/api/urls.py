from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ConsultationViewSet
from .views import (
    PrescribedMedicineListView,
    PrescribedMedicineDetailView,
    PrescribedMedicineByConsultationView,
    BillListCreateView,
    BillDetailView,
    DepartmentListCreateView,
    DepartmentDetailView,
    LabBillViewSet,
    AppointmentBillViewSet,
    PatientHistoryView
)


router = DefaultRouter()

router.register(
    r"consultations",
    ConsultationViewSet,
    basename="consultation"
)

router.register(
    r"appointment-bills",
    AppointmentBillViewSet,
    basename="appointment-bill"
)

router.register(
    r"lab-bills",
    LabBillViewSet,
    basename="lab-bill"
)

urlpatterns=[
    path("", include(router.urls)),

    #doctor
    path('cms/',views.cmsView),
    path('cms/<int:pk>/',views.consultationDetailView),
    path('PrescribedLab/',views.PrescribedLabView.as_view()),
    path('PrescribedLabDetailView/<int:pk>/',views.PrescribedLabDetailView.as_view()),
      
    
    #administrator
    path('user/',views.UserView.as_view()),
    path('user/<int:pk>/',views.UserDetail.as_view()),
    path("staff/",views.StaffListCreateView.as_view()),
    path("staff/<int:pk>/",views.StaffDetailView.as_view()),
    path("doctors/",views.DoctorListCreateView.as_view()),
    path("doctors/<int:pk>/",views.DoctorDetailView.as_view()),
   path(
    "medicines/",
    views.MedicineListCreateView.as_view(),
    name="medicine-list-create"
),

path(
    "medicines/<str:medicine_id>/",
    views.MedicineDetailView.as_view(),
    name="medicine-detail"
),
     path("lab-tests/", views.LabTestListCreateView.as_view()),
     path("lab-tests/<int:pk>/", views.LabTestDetailView.as_view()),

    #receptionist
    path("patients/",views.PatientListCreateView.as_view()),
    path("patients/<int:pk>/",views.PatientDetailView.as_view()),
    path("appointments/",views.AppointmentListCreateView.as_view()),
    path("appointments/<int:pk>/",views.AppointmentDetailView.as_view()),

    path(
    "prescribed-medicines/consultation/<int:consultation_id>/",
    PrescribedMedicineByConsultationView.as_view(),
    ),

    #other
    path("login/", views.LoginView.as_view()),

    path(
    "prescribed-medicines/",
    PrescribedMedicineListView.as_view(),
    ),

    path(
    "prescribed-medicines/<int:pk>/",
    PrescribedMedicineDetailView.as_view(),
    ),

    path(
    "bills/",
    BillListCreateView.as_view()
),

path(
    "bills/<int:pk>/",
    BillDetailView.as_view()
),

path(
    "departments/",
    DepartmentListCreateView.as_view(),
    name="department-list-create"
),

path(
    "departments/<str:department_id>/",
    DepartmentDetailView.as_view(),
    name="department-detail"
),

path(
        "patient-history/<int:patient_id>/",
        PatientHistoryView.as_view(),
        name="patient-history"
    ),

]
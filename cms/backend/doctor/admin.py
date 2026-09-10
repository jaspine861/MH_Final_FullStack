from django.contrib import admin
from .models import Consultation,PrescribedLab
# Register your models here.

admin.site.register(Consultation)

admin.site.register(PrescribedLab)
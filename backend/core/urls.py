from django.contrib import admin
from django.urls import path, include  # N'oublie pas l'import de 'include'

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # On branche les URLs de notre app api
]

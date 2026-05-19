from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('projets/', views.ProjetListCreateView.as_view(), name='projets_list'),
    path('messages/', views.MessageListCreate.as_view(), name='message-list-create'),
    path('user/me/', views.get_user_info, name='user_me'),
    path('user/update/', views.update_profile, name='user_update'),

    # Phase 4 — Candidatures
    path('projets/<int:projet_id>/postuler/', views.postuler, name='postuler'),
    path('projets/<int:projet_id>/candidatures/', views.candidatures_projet, name='candidatures_projet'),
    path('candidatures/<int:candidature_id>/statut/', views.changer_statut_candidature, name='changer_statut'),
]
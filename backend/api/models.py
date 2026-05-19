from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('freelancer', 'Freelancer'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='freelancer')
    bio = models.TextField(blank=True, default='')
    competences = models.JSONField(default=list, blank=True)
    tarif = models.CharField(max_length=50, blank=True, default='')
    localisation = models.CharField(max_length=100, blank=True, default='')
    entreprise = models.CharField(max_length=100, blank=True, default='')
    secteur = models.CharField(max_length=100, blank=True, default='')
    disponibilite = models.CharField(max_length=20, default='Disponible')
    avatar = models.URLField(blank=True, default='')

    def __str__(self):
        return f"{self.user.username} — {self.role}"


class Message(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="received_messages"
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"De {self.sender} à {self.receiver}"


class Projet(models.Model):
    titre = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    categorie = models.CharField(max_length=100)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mes_projets")
    date_publication = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre


class Candidature(models.Model):
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('accepte', 'Accepté'),
        ('refuse', 'Refusé'),
    ]
    projet = models.ForeignKey(
        Projet,
        on_delete=models.CASCADE,
        related_name='candidatures'
    )
    freelancer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='mes_candidatures'
    )
    lettre = models.TextField(blank=True, default='')
    tarif_propose = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    date_candidature = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('projet', 'freelancer')

    def __str__(self):
        return f"{self.freelancer.username} → {self.projet.titre} ({self.statut})"
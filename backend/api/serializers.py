from rest_framework import serializers
from .models import Message, Projet, UserProfile, Candidature
from django.contrib.auth.models import User
from django.utils.text import slugify


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source="sender.username")
    receiver_name = serializers.ReadOnlyField(source="receiver.username")

    class Meta:
        model = Message
        fields = [
            "id", "sender", "sender_name", "receiver",
            "receiver_name", "content", "timestamp", "is_read",
        ]


class ProjetSerializer(serializers.ModelSerializer):
    client_nom = serializers.ReadOnlyField(source='client.username')

    class Meta:
        model = Projet
        fields = [
            'id', 'titre', 'description', 'budget',
            'categorie', 'client', 'client_nom', 'date_publication'
        ]
        extra_kwargs = {'client': {'read_only': True}}


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['client', 'freelancer'])
    nom = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'role', 'nom']

    def create(self, validated_data):
        role = validated_data.pop('role')
        display_name = validated_data.pop('nom', '').strip()
        email = validated_data['email']

        username_raw = display_name or email.split('@')[0]
        username = slugify(username_raw) or 'user'
        unique_username = username
        counter = 1
        while User.objects.filter(username=unique_username).exists():
            unique_username = f"{username}{counter}"
            counter += 1

        user = User.objects.create_user(
            username=unique_username,
            email=email,
            password=validated_data['password'],
        )
        if display_name:
            user.first_name = display_name
            user.save()
        UserProfile.objects.create(user=user, role=role)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'role', 'bio', 'competences', 'tarif',
            'localisation', 'entreprise', 'secteur',
            'disponibilite', 'avatar',
        ]


class CandidatureSerializer(serializers.ModelSerializer):
    freelancer_nom = serializers.ReadOnlyField(source='freelancer.username')
    freelancer_avatar = serializers.SerializerMethodField()
    projet_titre = serializers.ReadOnlyField(source='projet.titre')

    class Meta:
        model = Candidature
        fields = [
            'id', 'projet', 'projet_titre',
            'freelancer', 'freelancer_nom', 'freelancer_avatar',
            'lettre', 'tarif_propose', 'statut', 'date_candidature',
        ]
        extra_kwargs = {
            'freelancer': {'read_only': True},
            'statut': {'read_only': True},
        }

    def get_freelancer_avatar(self, obj):
        try:
            return obj.freelancer.profile.avatar
        except UserProfile.DoesNotExist:
            return ''
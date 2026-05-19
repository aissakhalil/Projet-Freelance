from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Projet, Message, UserProfile, Candidature
from .serializers import (
    ProjetSerializer, MessageSerializer,
    RegisterSerializer, UserProfileSerializer, CandidatureSerializer
)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip().replace(' ', '_')
        email = request.data.get('email', '').strip()

        if User.objects.filter(username=username).exists():
            return Response({"error": "Ce nom d'utilisateur est déjà pris."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Cet email est déjà utilisé."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['username'] = username
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Compte créé avec succès."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=user)

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': profile.role,
        'bio': profile.bio,
        'competences': profile.competences,
        'tarif': profile.tarif,
        'localisation': profile.localisation,
        'entreprise': profile.entreprise,
        'secteur': profile.secteur,
        'disponibilite': profile.disponibilite,
        'avatar': profile.avatar,
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)

    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Profil mis à jour."})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjetListCreateView(generics.ListCreateAPIView):
    queryset = Projet.objects.all().order_by('-date_publication')
    serializer_class = ProjetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postuler(request, projet_id):
    try:
        projet = Projet.objects.get(id=projet_id)
    except Projet.DoesNotExist:
        return Response({"error": "Projet introuvable."}, status=status.HTTP_404_NOT_FOUND)

    if projet.client == request.user:
        return Response({"error": "Vous ne pouvez pas postuler à votre propre projet."}, status=status.HTTP_403_FORBIDDEN)

    if Candidature.objects.filter(projet=projet, freelancer=request.user).exists():
        return Response({"error": "Vous avez déjà postulé à ce projet."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = CandidatureSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(projet=projet, freelancer=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def candidatures_projet(request, projet_id):
    try:
        projet = Projet.objects.get(id=projet_id, client=request.user)
    except Projet.DoesNotExist:
        return Response({"error": "Projet introuvable ou accès refusé."}, status=status.HTTP_404_NOT_FOUND)

    candidatures = Candidature.objects.filter(projet=projet).order_by('-date_candidature')
    serializer = CandidatureSerializer(candidatures, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def changer_statut_candidature(request, candidature_id):
    try:
        candidature = Candidature.objects.get(id=candidature_id, projet__client=request.user)
    except Candidature.DoesNotExist:
        return Response({"error": "Candidature introuvable ou accès refusé."}, status=status.HTTP_404_NOT_FOUND)

    nouveau_statut = request.data.get('statut')
    if nouveau_statut not in ['en_attente', 'accepte', 'refuse']:
        return Response({"error": "Statut invalide."}, status=status.HTTP_400_BAD_REQUEST)

    candidature.statut = nouveau_statut
    candidature.save()
    return Response({"message": f"Statut mis à jour : {nouveau_statut}"})
# M2Isign

Outil permettant de signer automatiquement sur M2iformation

Créer des fichiers batch comme suit : 

@echo off
set USERNAME="email"
set PASSWORD="mot de passe"
npx playwright test tests/M2i

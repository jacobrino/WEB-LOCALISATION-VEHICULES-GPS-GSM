# Connexions — Arduino UNO + SIM808 (GPS/GSM)

Ce document décrit le câblage utilisé pour le boîtier embarqué (véhicule) : **Arduino UNO** + **module SIM808** (GPS + GSM).

---

## 1) Câblage série (UART) — Arduino ↔ SIM808

Le module SIM808 communique avec l’Arduino via une liaison série (UART).  
Dans le projet, la communication se fait en **SoftwareSerial** sur les broches suivantes :

| SIM808 | Arduino UNO | Rôle |
|-------|-------------|------|
| **TXD** | **D2 (RX)** | Données envoyées par le SIM808 vers l’Arduino |
| **RXD** | **D3 (TX)** | Données envoyées par l’Arduino vers le SIM808 |
| **GND** | **GND** | Masse commune obligatoire |

✅ Résultat : l’Arduino lit les réponses aux commandes AT et envoie les commandes AT au SIM808.

> ⚠️ Remarque : le SIM808 fonctionne en logique **TTL**. Vérifie toujours la compatibilité des niveaux logiques si tu changes de carte.

---

## 2) Alimentation du SIM808

Le module SIM808 consomme **beaucoup de courant**, surtout lors de l’émission GSM (envoi SMS / attachement réseau).  
Il est recommandé d’utiliser une alimentation stable (souvent **4.0V à 4.2V**, suivant le module).

### Recommandation générale
- Utiliser une alimentation capable de fournir **2A** en pic.
- Éviter d’alimenter le SIM808 uniquement depuis le 5V de l’Arduino (risque de reboot / perte réseau).

---

## 3) Antennes

Le SIM808 utilise **deux antennes distinctes** :

| Antenne | Port / connecteur | Utilité |
|--------|--------------------|---------|
| **GSM** | Antenne GSM (GPRS) | Réseau mobile + envoi SMS |
| **GPS** | Antenne GPS | Réception satellites, calcul position |

✅ Pour de meilleures performances GPS :
- placer l’antenne GPS **près d’une vitre** ou en surface dégagée
- éviter les zones métalliques fermées

---

## 4) Mise sous tension / bouton PowerKey (démarrage automatique)

Le SIM808 nécessite une **impulsion sur la broche PowerKey** (ou un bouton ON) pour s’allumer.

Dans ton montage, tu as :
- **soudé un fil** vers la patte du bouton de démarrage,
- et injecté une impulsion **5V** via l’Arduino pour automatiser l’allumage.

👉 Cela permet d’avoir un boîtier “autonome” : dès que le véhicule est alimenté, le SIM808 démarre automatiquement.

> L’implémentation exacte dépend du module SIM808 (carte breakout).  
> Si tu changes de module, vérifie le schéma de la broche **PWRKEY**.

---

## 5) Alimentation dans le véhicule (12V)

Dans un véhicule, l’alimentation standard est **12V**.  
Deux options recommandées :

1. **Depuis la boîte à fusibles (solution propre)**
2. **Depuis un adaptateur OBD (solution simple)**

Dans tous les cas, prévoir :
- un régulateur DC-DC (12V → 5V / 4.1V selon module)
- un fusible de protection
- un câblage isolé

---

## 6) Checklist de vérification (avant test)

✅ Masse commune Arduino/SIM808  
✅ Antenne GSM branchée  
✅ Antenne GPS branchée  
✅ Alimentation stable (pas via USB Arduino seulement)  
✅ RX/TX correctement croisés (TX ↔ RX)  
✅ SIM insérée (PIN désactivé conseillé)

---

## 7) Exemple de pins utilisés dans le code

Dans `GPS_tracker.ino`, les pins SoftwareSerial typiques sont :

- RX Arduino : **D2**
- TX Arduino : **D3**

Si tu changes ces pins, adapte la déclaration SoftwareSerial dans le code.

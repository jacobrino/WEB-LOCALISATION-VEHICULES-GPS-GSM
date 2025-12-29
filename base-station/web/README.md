# Plateforme Web (Apache2 + PHP)

Ce dossier contient l’interface Web de suivi du véhicule, organisée en **3 modules**, chacun possédant son propre `index.php` :

- `consulter/` : affichage des positions (temps réel) et informations principales.
- `osm/` : affichage cartographique (Leaflet / OpenStreetMap).
- `parametre/` : page de configuration (options, alertes, audio, personnalisation).

## Déploiement (station de base)

### Option A — Déploiement simple (DocumentRoot par défaut)
Copier le contenu de `base-station/web/` dans `/var/www/html/` :

```bash
sudo rm -rf /var/www/html/*
sudo cp -r base-station/web/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
sudo systemctl restart apache2
```

Accès :
- `http://IP_DU_RASPBERRY/consulter/`
- `http://IP_DU_RASPBERRY/osm/`
- `http://IP_DU_RASPBERRY/parametre/`

### Option B — VirtualHost recommandé
Déployer dans un dossier dédié (ex. `/var/www/web-localisation/`) et activer un VirtualHost.

1) Copier :
```bash
sudo mkdir -p /var/www/web-localisation
sudo cp -r base-station/web/* /var/www/web-localisation/
sudo chown -R www-data:www-data /var/www/web-localisation
```

2) Créer/activer le VirtualHost :
- Fichier fourni : `web-localisation.conf`
- À placer dans : `/etc/apache2/sites-available/web-localisation.conf`

Puis activer :
```bash
sudo a2ensite web-localisation.conf
sudo a2enmod rewrite
sudo systemctl reload apache2
```

## Dépendances PHP/MySQL
Installer PHP et le connecteur MySQL (si non installé) :

```bash
sudo apt install -y php libapache2-mod-php php-mysql
sudo systemctl restart apache2
```

## Remarque
Si tu veux que `http://IP/` redirige vers `consulter/`, ajoute un `index.php` à la racine du DocumentRoot :

```php
<?php header("Location: consulter/"); exit; ?>
```

#!/bin/bash

delimMessageVu='Vu'	
minLongueurCoordonnee=120
delimMessageCoordonee='\n'
delimCoordonnee='$'
nomFichierBuff='buffer.txt'

utilisateurBase="debian-sys-maint" #A voir dans /etc/mysql/conf
motDePasseBase="i5Quj2DV6fETQXHM" #Pareille
nomBase="Coordonnee"
#nomBaseSecondSauvegarde="CoordoneeSauv"
nomTable="Valeur"


listMessageInbox=$(/bin/ls /var/spool/gammu/inbox/);
tableau=(${listMessageInbox//\n/}) 
#on split les messages reçu qui sont dans inbox en \n et tester si les messages sont vu ou pas cad il contient le mot "Vu" à la derniere ligne. 
#S'il est vu, celà veut dire qu'il est déjà dans la base de donnée.
#Si non, on le met dans la base de donnée structurée.???? 

for i in ${tableau[*]};do	
#i ici est le nom des messages dans le dossier inbox.
entrer=$(/bin/cat /var/spool/gammu/inbox/$i); 
#ici on lit le contenu du message et le mettre ensuite dans entrer.

	if [[ $entrer =~ .*$delimMessageVu.* ]]; then
	#si la chaine contient le mot Vu
	echo $entrer " On ne fait rien car il est déjà dans la base de donnee. " # on ne fait plus rien.
	else
	#Ici, le message n'est pas encore vu donc, il faut le caster, structuer
	#Au final le mettre dans la base de donnée ensuite, ajouter "Vu" à la fin.
	#Le message est de la forme: "20220304192059.000$-49.258512$28.659841$40$20" multiplié par 3
	#Doit aumoins avoir 40*3 caractères.

	#echo $entrer "Pas egal"

		if [ "${#entrer}" -ge "$minLongueurCoordonnee" ]; then
		#-ge plus grand ou egal.
		#Ici, le coordonne est valide. on le caste avec le delim '\n'

		readarray -d $delimMessageCoordonee -t tableauCoordonnee <<< "$entrer" #Operation de split.

			for coordonnee in ${tableauCoordonnee[*]};do
			#Chaque valeur de coordonnee est maintenant splite avec le delim '$' pour avoir date,lat,longi,alti,vitesse
			echo "Valeur de coordonnee : $coordonnee"
			
			readarray -d $delimCoordonnee -t tableauCoordonneeRecup <<< "$coordonnee" #Operation de split .

			#dateComplet=${tableauCoordonneeRecup[0]}
			echo ${tableauCoordonneeRecup[0]} > $nomFichierBuff
			#On creer un buff sur un fichier.
			annee=$(/usr/bin/cut -c1-4 $nomFichierBuff) #Recuperer ligne 1-4 sur le fichier buf 
			mois=$(/usr/bin/cut -c5-6 $nomFichierBuff) #Recuperer ligne 5-6 sur le fichier buf 
			jour=$(/usr/bin/cut -c7-8 $nomFichierBuff) #Recuperer ligne 7-8 sur le fichier buf 
			heure=$(/usr/bin/cut -c9-10 $nomFichierBuff) #Recuperer ligne 9-10 sur le fichier buf 
			minute=$(/usr/bin/cut -c11-12 $nomFichierBuff) #Recuperer ligne 11-12 sur le fichier buf 
			seconde=$(/usr/bin/cut -c13-14 $nomFichierBuff) #Recuperer ligne 13-14 sur le fichier buf 

			/bin/rm $nomFichierBuff
			#Ici on supprime le buffer.
			
			latitude=${tableauCoordonneeRecup[1]}
			longitude=${tableauCoordonneeRecup[2]}
			altitude=${tableauCoordonneeRecup[3]}
			vitesse=${tableauCoordonneeRecup[4]}

			#echo "Valeur d'annee: $annee" #OK
			#echo "Valeur de mois: $mois" #OK
			#echo "Valeur de jour: $jour" #OK
			#echo "Valeur de heure: $heure" #OK
			#echo "Valeur de minute: $minute" #OK
			#echo "Valeur de seconde: $seconde" #OK
			#echo "Valeur de latitude: $latitude" #OK
			#echo "Valeur de longitude: $longitude" #OK
			#echo "Valeur de altitude: $altitude" #OK
			#echo "Valeur de vitesse: $vitesse" #OK
			
			#Chaque colonne dans INSERT est la même qu'à la base de donnee.
			
			command="INSERT INTO $nomTable (annee,mois,jour,heure,minute,seconde,latitude,longitude,altitude,vitesse) VALUES ('$annee','$mois','$jour','$heure','$minute','$seconde','$latitude','$longitude','$altitude','$vitesse');"

			retour =$(mysql --user="$utilisateurBase" --password="$motDePasseBase" --database= "$nomBase" --execute="$command");
		
			done			
			#On met Vu le message.
			echo "$delimMessageVu" >> /var/spool/gammu/inbox/$i	
		else
		echo "Coordonnee invalide, on ne fait rien. "
		fi	
	fi
done

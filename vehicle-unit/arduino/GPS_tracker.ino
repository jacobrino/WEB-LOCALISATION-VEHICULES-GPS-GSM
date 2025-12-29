#include <SoftwareSerial.h>
#include <DFRobot_sim808.h>
#include <string.h>

#define PIN_TX    3 //Pin de connexion de l'emplacement du broche de TX du module GSM
#define PIN_RX    2 //Pin de connexion de l'emplacement du broche de RX du module GSM
#define PIN_PWR   9 //Pin de connexion de l'emplacement du broche de PWR du module GSM

#define tempsReceptionGPS 10*1000 //5 secondes, 2 secondes minimum. et il y a une latence de 12 secondes lorsqu'on fait à 20 secondes au vu des algorithme de casting, split et d'envoie des messages.
#define tempsFaible   100
#define tempsNormal   300
#define tempsEleve    2000 
#define numeroModemRecepteur   "+261320449641"    //"0325742458";//Cathicia
#define codeGetCoordoneeGps   "getGPS"
#define longueurSmsCode   7 //On prétend avoir un code d'SMS de 7 cases au max.
#define longueurNumeroTelephone   15  //Taille d'un numéro de téléphone avec +26x comme debut max.    
#define longueurMessageAEnvoyer   158 //Le max est 20220327170302$-12.292872$-49.297630$-10000$100000, 52 ligne est le nombre du message+ "\n" donc 53 .. avec trois coordonne ça donne 158
#define longueurMessageCoordonnee   52  //Le coordonne est 20220327170302$-12.292872$-49.297630$-10000$100000 qui fait 52 caracteres.
#define longueurData   135   //La longueur max recu avec la commande AT+CGNSINF et AT+CSQ //GPS ET GSM.
//#define longueurMessageNonEnvoye    55 //Le nombre de tableau qu'on peut stocker des messages non envoyé depourvu de signal GSM.
//#define tempsAttenteSignalGSM   180*1000 //Lorsqu'on a pas de signal GSM on attend 3 minutes pour pouvoir continuer le programme , c'est le temps de rafraichissement.
                                         //Avec 55 tableau , on peut stocker des coordonnees pendant 2 heure et demi et une fois on a signal GSM on les envoie tous et vider le tableau.
#define longueurMessageNonEnvoye    10
#define tempsAttenteSignalGSM   30*1000

SoftwareSerial gps(PIN_TX,PIN_RX); //La connexion vers le module GSM sur les pins RX,TX,PWR
DFRobot_SIM808 sim808(&gps);//Connect RX,TX,PWR

int compteurBoucleCoordonneeValide=0;//Variable pour compter le nombre de coordonnee reçu..Une fois égal à trois on envoie un sms contenant ces trois coordonnees.
int compteurBoucleMessageNonEnvoye=0;

boolean validiteCoordonne=false;
boolean SiSignalGSMUtilisable=false;

String utcDate="NULL",lat="NULL",longi="NULL",alti="NULL",vitesse="NULL";
String guillemet="\"";
String messageNonEnvoye[longueurMessageNonEnvoye];

char dataBuffer[longueurData];
char delimCoordonee='\n';//Ce qui separe les coordonnes .
char delimContenuCoordonnee='$';//Ce qui sépare le contenue du coordonnee , lat$longitude$alitude...etc.
char messageAEnvoyerModem[longueurMessageAEnvoyer];


char phone[]=numeroModemRecepteur;

void setup() //Bloc d'initialisation du programme
{
      Serial.println("Lancement du programme. ");
      
      gps.begin(9600);
      Serial.begin(9600); 
      delay(tempsNormal);
      pinMode(PIN_PWR,OUTPUT);//Definir que la pin PWR est comme sortie , car elle délivre une tension de 5V. 
      while(!sim808.checkPowerUp()) 
      {  //Tester si le module GSM est alimenté ou pas
          delay(300);
          sim808.powerUpDown(PIN_PWR);  //On démarre le module. 
      }
      //Ici on sort de la boucle, donc le module GSM est alimenté. 
      Serial.println("Module Sim808 bien alimenté et prêt à être utilisé. ");
      delay(tempsEleve);
      initialisationModemSim808(); 
      compteurBoucleMessageNonEnvoye=0; 
      compteurBoucleCoordonneeValide=0;        
      delay(tempsFaible);
}

void loop() //Le fondement du robot, celle qui tourne en boucle.
{     
          
          viderBufferGps();//A ne pas supprimer pour être fraiche au début lors de capture coordonee.
          delay(tempsFaible);//A ne pas supprimer.
          recevoirResultat("AT+CGNSINF",dataBuffer);//Ici le resultat est stocké dans dataGPS. Pas besoin de vider dataGPS car dans la fonction, elle est vider.
          delay(tempsFaible);
                
          recupererChaineCoordonnee(dataBuffer);//En concordance avec dataGPS.

          delay(tempsEleve);//A ne pas supprimer.
        
        if(validiteCoordonne)
        {
        //On active la fonctionnalité .
        activerFonctionnalite();//Fonctionnalité getGPS.
        
        delay(tempsFaible);//A ne pas supprimer.
        //Convertir coordonneeMessage en Char avec la variable coordonneeMessageChar
        char coordonneMessageChar[longueurMessageCoordonnee];
        (coordonneeMessage()+"\n").toCharArray(coordonneMessageChar,longueurMessageAEnvoyer);//La conversion
        delay(tempsFaible);
        
        //Concatenation de coordonneMessageChar dans messageAEnvoyerModem
        strcat(messageAEnvoyerModem,coordonneMessageChar);
        
        delay(tempsFaible);//A ne pas supprimer.
        Serial.println("Voici message Total ici:  ");      
        Serial.println(messageAEnvoyerModem);
        delay(tempsFaible);
        }

        if(compteurBoucleCoordonneeValide==3)//Si compteur boucle où on recoive coordonnee valide est 3, on envoie le message vers le modem recepteur.
        {
        delay(tempsFaible); //A ne pas supprimer. 
        
        //Lancer la commande AT+CMGF=1, avant.
        recevoirResultat("AT+CSQ",dataBuffer);//Ici le resultat est stocké dans dataGSM. Pas besoin de vider dataGSM car il est déjà fait dans la fonction.
        recupererChaineSignalGsm(dataBuffer);
        
        delay(tempsFaible);//A ne pas supprimer.
        envoyerMessageFinal();
        delay(tempsNormal);//A ne pas supprimer.
        }
               
//Serial.println("On attend quelques secondes pour recevoir un autre coordonnée . ") ;
delay(tempsReceptionGPS);//2 secondes minimum.

}
void afficherResultat(boolean debugage)
{
        while(gps.available())
        {
          char c=gps.read();
          if(debugage)
          Serial.print(c);         
        }
}
void recevoirResultat(String command, char *sorti)
{
        //Vider 'sorti' d'abord.
        viderChar(sorti);
        delay(tempsFaible);
        gps.flush();
        long int time=millis();
        gps.println(command); 

        while((time+1000)>millis())
        {
            while(gps.available())
            {
              char c=gps.read(); 
              char d[]={c,'\0'};//d est c sous forme de tableaux.
              //Concatener d avec sorti 
              strcat(sorti,d);       
            }
        }
  delay(tempsFaible);       
}
void recupererChaineCoordonnee(char *dataGPS)
{
  delay(tempsFaible);
//The result of dataChar is the same on entrer but the type is changed :
/*
//AT+CGNSINF
//+CGNSINF: 1,1,20220311122236.000,-12.292858,49.297647,70.300,0.02,97.1,1,,0.8,1.5,1.3,,11,10,,,39,,
//
//OK
*/
//On split ces résultat en 3 petits morceaux dont le séparateur est "\n".

  char *ptr=strtok(dataGPS,"\n");
  char debutCoordonee[]="+CGNSINF:";
  
  delay(tempsFaible);
    while(ptr!=NULL)
    {
        if(siChaineCharACommenceParCharB(ptr, debutCoordonee))//On ne prends par la valeur vide et qui ne commence pas par +CGNSINF:
        {
          delay(tempsFaible);
          //sorti=ptr;//sorti
          
//            Serial.print("La sorti...  "); 
//            Serial.println(ptr);
           
            delay(tempsFaible);
            SiCoordonneeValide(ptr);//Tester si la sorti des coordonnees sont valide ou pas. si oui, on met à true automatiquement la variable validiteCoordonne et on incremente la valeur du compteurBoucleCoordonneeValide.
            delay(tempsFaible); 
            if(validiteCoordonne)
            {
              delay(tempsFaible);
              //Sorti Ok, maintenant on recupère seulement les coordonnées utiles en le castant et les mettre ensuite dans chaque variable correspondant(definirMessage).
              definirMessage(ptr); 
              delay(tempsFaible);
              compteurBoucleCoordonneeValide++;
              delay(tempsFaible);
            }
            else//on n'obtient pas de coordonnee valide, donc il se peut qu'on a pas de signal GPS. cependant on doit réactualiser le GPS avec initialisationModemSim808.
            initialisationModemSim808(); 
          
          break; 
        }
      ptr=strtok(NULL,"\n");//De passer à l'autre chaine spliter.
    }
    delay(tempsFaible);
}

void definirMessage(char *dataChar)
{
  delay(tempsFaible);
  String donnee[7];
  int i=0;
  delay(tempsFaible);
  char *ptr=strtok(dataChar,",");
  delay(tempsFaible);
  
    while(ptr!=NULL)
    {
      donnee[i]=ptr;
      ptr=strtok(NULL,",");//De passer à l'autre chaine spliter.
      i++;
      delay(tempsFaible);
      if(i==7)//On recupere jusqu'à 6 seulement, donc, à 7 on quitte la boucle.
      break;
    } 
    
    delay(tempsFaible);   
    utcDate=donnee[2];;
    delay(tempsFaible);
    lat=donnee[3];
    longi=donnee[4];
    delay(tempsFaible);
    alti=donnee[5].toInt();
    vitesse=donnee[6].toInt();
    delay(tempsFaible);
}
String coordonneeMessage()//Ok, Message d'un seul coordonnee.
{
  delay(tempsFaible);
  return utcDate+delimContenuCoordonnee+lat+delimContenuCoordonnee+longi+delimContenuCoordonnee+alti+delimContenuCoordonnee+vitesse;
}

void SiCoordonneeValide(char *entrer)//Un coordonnee est valide si nombre virgule==20 et total caractère supérieur à 98
{
  delay(tempsFaible);

  if(strlen(entrer)>=97&&apparitionCaractereVirgule(entrer)==20)
  {
    delay(tempsFaible);
    Serial.println("Coordonnee valide. ");
    validiteCoordonne=true;
  }
  else
  {
    delay(tempsFaible);
    Serial.println("Coordonnee non valide. ");
    validiteCoordonne=false;
  }
}
int apparitionCaractereVirgule(char *entrer)
{
  int sorti=0;
  delay(tempsFaible);
  for(int i=0;i<strlen(entrer);i++)
  {
    if(entrer[i]==',')
    sorti++;
  }
  return sorti;
}

boolean siChaineCharACommenceParCharB(char *a, char *b)//OK
{
  if(strstr(a, b)==NULL)
  return false;
  else
  return true;
  /*
   * The strstr() function finds the first occurrence of the substring \p
    s2 in the string \p s1.  The terminating '\\0' characters are not
    compared.
   */
}

void sendSmsCommandeAt(char *phon, String sms)
{      
        delay(tempsFaible);  
        viderBufferGps();
        delay(tempsFaible);
        gps.print("AT+CMGF=1\n"); //Activation d'envoie Sms.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(true);
        delay(tempsFaible);
        String command="AT+CMGS="+guillemet+phon+guillemet+"\n";
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        gps.print(command);
        delay(tempsFaible);
        afficherResultat(true); 
        delay(tempsFaible);
        gps.println(sms);//Le message à envoyer.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(true); 
        delay(tempsFaible);
        gps.print((char)26);//Caractère chariot (ctrl+z)
        delay(tempsFaible);
        afficherResultat(true); 
        delay(tempsFaible);
        gps.print("\n");
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(true); 
        delay(tempsFaible);
}
void envoyerMessageFinal()//Fonction dédié à l'envoie des sms vers le modem recepteur.
{
      delay(tempsFaible);
      if(SiSignalGSMUtilisable)
      {
        delay(tempsFaible);
          for(int i=0;i<compteurBoucleMessageNonEnvoye;i++)
          {
              delay(tempsNormal);
              sendSmsCommandeAt(phone,messageNonEnvoye[i]);
              delay(tempsEleve);
              messageNonEnvoye[i]="";
              delay(tempsFaible);
          }
          delay(tempsFaible);
          compteurBoucleMessageNonEnvoye=0;
          delay(tempsFaible);
          Serial.println("Message avant l'envoie.");
          Serial.println(messageAEnvoyerModem);
          
          delay(tempsNormal);        
          sendSmsCommandeAt(phone,messageAEnvoyerModem);//On envoie le message coordonnee actuelle.       
          delay(tempsNormal);
          compteurBoucleCoordonneeValide=0;
          viderChar(messageAEnvoyerModem);
          delay(tempsFaible);
      }
      else
      {
          //Serial.println("Signal GSM introuvable. ");
          
          //Gerer l'overflow du mémoire de sauvegarde dans le cas où compteurBoucleMessageNonEnvoye superieur à longueurMessageNonEnvoye:
          if(compteurBoucleMessageNonEnvoye>=longueurMessageNonEnvoye-1)
          compteurBoucleMessageNonEnvoye=0;
          
          delay(tempsFaible);
          messageNonEnvoye[compteurBoucleMessageNonEnvoye]=messageAEnvoyerModem;
          delay(tempsFaible);

          viderChar(messageAEnvoyerModem);
          delay(tempsFaible);
          compteurBoucleMessageNonEnvoye++;
          compteurBoucleCoordonneeValide=0;
          delay(tempsAttenteSignalGSM);
      }
      
}
void viderBufferGps()
{
  delay(tempsFaible);
  while(gps.available())char c=gps.read();
}

void recupererChaineSignalGsm(char *dataChar)
{
  delay(tempsFaible);
  String sorti;

/*
AT+CSQ
+CSQ: 18,0

OK
*/
    //On split ces résultat en 3 petits morceaux dont le séparateur est "\n".
  char *ptr=strtok(dataChar,"\n");
  char debutSignal[]="+CSQ:";
  delay(tempsFaible);
    while(ptr!=NULL)
    {
      if(siChaineCharACommenceParCharB(ptr, debutSignal))//On ne prends par la valeur vide et qui ne commence pas par +CGNSINF:
        {
          delay(tempsFaible);
          sorti=ptr; 
           //Ici, on recupere sorti = "+CSQ: 18,0"
           
          delay(tempsFaible);
          String buff="";
          for(int i=0;i<sorti.length();i++)
          {
            if(testerSiChiffre(sorti.charAt(i)))
            buff=buff+sorti.charAt(i);
            
            if(sorti.charAt(i)==',')
            break;
          }
          int signalStrength=buff.toInt();
//          Serial.print("signalStrength vaut: ");
//          Serial.println(signalStrength);
          delay(tempsFaible);
              if(signalStrength>=1&&signalStrength<99)//A 0 on a aucun signal réseau, A 1 le signal est très faible(utilisable) et aussi à 99 problème signal. 
               {
                      delay(tempsFaible);
                      SiSignalGSMUtilisable=true;
                      Serial.println("Signal GSM Ok. ");
                      delay(tempsFaible);
               }
               else
               {
                      delay(tempsFaible);
                      Serial.println("Signal GSM introuvable.");
                      SiSignalGSMUtilisable=false;
                      delay(tempsFaible);
               }
        break;
        }
      ptr=strtok(NULL,"\n");//De passer à l'autre chaine spliter.
    }
}

void viderChar(char *entrer)
{
  delay(tempsFaible);
    char b[]="";
    strcpy(entrer,b);
}
void effacerToutMessageSaufUnread()
{  
        viderBufferGps();
        delay(tempsFaible);
        gps.print("AT+CMGF=1\n"); //Activation d'envoie Sms.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        gps.print("AT+CMGD=1,3\n"); //Activation de suppressions Sms.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false); //Pour vider buffer.
        delay(tempsFaible);
}
void recupNumeroPhoneSmsParIndex(String indexSMS,boolean changerStatusSms,char *sortiNumero)
{          
        viderBufferGps();
        delay(tempsFaible);   
        gps.print("AT+CMGF=1\n"); //Activation du mode 1, cad les sms sont affichés en brute.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false);
        delay(tempsFaible);
        recevoirTelephoneSms(indexSMS,changerStatusSms,sortiNumero);//La commande est insérée dedans. 
}
void recevoirTelephoneSms(String indexSMS, boolean changerStatusSms,char *sortiNumero)
{
  delay(tempsFaible);
  viderChar(dataBuffer);
  delay(tempsFaible);
  String command="";
        gps.flush();
        long int time=millis();
        if(changerStatusSms)
        command="AT+CMGR="+indexSMS;  //,1 Pour dire de le considerer comme READ(Vu).
        else
        command="AT+CMGR="+indexSMS+",1";  //,1 Pour dire de ne pas le considerer comme READ(Vu).
        gps.println(command);;
        afficherResultat(false);//OK 

        while((time+1000)>millis())
        {
            while(gps.available())
            {
              char c=gps.read();
              char d[]={c,'\0'};//d est c sous forme de tableaux.
              //Concatener d avec sorti 
              strcat(dataBuffer,d);       
            }
        }
        
  delay(tempsFaible);

  recupererNumeroTelephone(dataBuffer,sortiNumero); //dataBufferNumeroTelephone OK 
}


void recupererNumeroTelephone(char *entrer,char *sortiNumero)
{
  delay(tempsFaible);
//The result of dataNumeroTelephone is the same on entrer but the type is changed :
/*
AT+CMGR=1,1

+CMGR: "REC UNREAD","+261324049847","Parabole","210+12"
sms

OK
*/
//On split ces résultat en 3 petits morceaux dont le séparateur est "\n".

  char *ptr=strtok(entrer,"\n");
  char debutCoordonee[]="+CMGR:";
  delay(tempsFaible);
    while(ptr!=NULL)
    {
      delay(tempsFaible);
      
      //Sorti ptr OK.
      if(siChaineCharACommenceParCharB(ptr, debutCoordonee))//On ne prends par la valeur vide et qui ne commence pas par +CGNSINF:
        {
          //sorti=ptr;
          //sorti est de type "+CMGR: "REC UNREAD","+261324049847","Parabole","210+12"
          //On prends la deuxieme chaine spliter.
          
          char *str=strtok(ptr,",");//Premiere chaine spliter.
          str=strtok(NULL,",");//Deuxieme chaine spliter. c'est le numero de telephone.//"+261324049847"//SUpprimer les deux guillements.

          //str OK.
          
          String strString=str;
          strString.replace("\"","");//On supprimer le guillemet,cad remplacer le guillement par caractere vide.
          //strString OK
          delay(tempsFaible);

          //Operation de la mise en entré vers son tableau
          
          //Vider d'abord numeroTelephoneRecuperer
          //char numeroTelephoneRecuperer[longueurNumeroTelephone];//Variable ou mettre le numero recupéré.
          //viderChar(numeroTelephoneRecuperer);
          strString.toCharArray(sortiNumero,longueurNumeroTelephone+1);//Maintenant le numéro avec guillement est supprimé.
          //OK le numero est bien entrer.
              
          break; 
        }
      ptr=strtok(NULL,"\n");//De passer à l'autre chaine spliter.
    }
    delay(tempsFaible);
    
}
void activerFonctionnalite()
{
          //0 aucun sms unread
          //10 existe message à l'index 10
          //-1 Erreur.
          //AT+CMGD=1,3
          //3 Delete all read messages from preferred message storage, sent and unsent mobile originated messages leaving unread messages untouched.

          int indexSms=0;//C'est aussi l'index du message UNREAD.
          indexSms=sim808.isSMSunread();
          delay(tempsFaible);
          Serial.println(indexSms);
          
          if(indexSms==0)
              effacerToutMessageSaufUnread();//message inutile.
          else if(indexSms!=-1)
          {
            delay(tempsFaible);
            //On a message Unread à l'index indexSms. 
            //Lire le dernier message et comparer avec "getGPS".
            
            String indexSmsString="";
            indexSmsString+=indexSms;//On append String + int.. , ça ne marche pas en concatenation. cad l'operation plus .
            
            delay(tempsFaible);
            char smsRead[longueurSmsCode];//On prétend avoir un code d'SMS de 7 cases au max.
            char smsPhone[longueurNumeroTelephone];//Taille d'un numéro de téléphone avec +26x comme debut max. 
            delay(tempsFaible);
            char smsGetGPS[]=codeGetCoordoneeGps;        
           
            if(true)//SiSignalGSMUtilisable
            {
                  if(sim808.readSMS(indexSms, smsRead, longueurSmsCode))//Après avoir vu, le message est considéré READ.
                  {
                    //Comparer smsRead et getGPS
                    if(strcmp(smsRead,smsGetGPS)==0)//Les deux sont égaux.
                    {//Le message recu est getGPS, on envoie donc la latitude et la longitude.
                      delay(tempsFaible);

                      char numeroTelephoneRecuperer[longueurNumeroTelephone];
                      recupNumeroPhoneSmsParIndex(indexSmsString,false,numeroTelephoneRecuperer);
                      delay(tempsNormal);
                      
                      //send sms coordonneeGps sur Maps.
                      String messageToSend="http://maps.google.com/maps?q=loc:"+lat+","+longi;
                      delay(tempsFaible);
                      sendSmsCommandeAt(numeroTelephoneRecuperer,messageToSend);//char c*, string s
                      delay(tempsNormal);
                    }
                  }
            }
          }
}
void initialisationModemSim808()
{
        delay(tempsFaible);
        gps.print("AT+CGNSPWR=1\n"); //Activation du GPS
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false);
        delay(tempsFaible);
        gps.print("AT+CGNSSEQ=\"RMC\"\n"); 
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false);
        gps.print("AT+CGPSSTATUS?\n"); 
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false);   
        gps.print("AT+CGPSOUT=32\n"); //Pour raffraichir la reception.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false);
        gps.print("AT+CGPSOUT=0\n"); //on désactive le rafraichissement.
        delay(tempsFaible);//A ne pas supprimer sinon, ça marche pas.//Modifiable
        afficherResultat(false);
        
        //Maintenant tout est OK... 
}
boolean testerSiChiffre(char e)
{
  if(e=='0'||e=='1'||e=='2'||e=='3'||e=='4'||e=='5'||e=='6'||e=='7'||e=='8'||e=='9')
  return true;
  return false;
}
//void remplacerCaractereGuillemet(char *entrer, char remplace)
//{
//  char 
//  for (int i=0;i<strlen(entrer);i++)
//  {
//    if(entrer[i]=='\"')
//
//    else
//    
//  }
//}

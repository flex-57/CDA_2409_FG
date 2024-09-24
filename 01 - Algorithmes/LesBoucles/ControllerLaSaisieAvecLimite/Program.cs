const string PASSWORD = "formation";
const int MAX_ATTEMPS = 3;

string passwordVerif;
int remainingAttemps;
int counter = 1;
bool isOk;

do
{
    remainingAttemps = MAX_ATTEMPS - counter;

    Console.WriteLine("Veuillez taper le mot de passe :");
    passwordVerif = Console.ReadLine();

    if(passwordVerif == PASSWORD) /* ou passwordVerif.Equals(PASSWORD), est-ce comme en java ou comme en php ?? */
    {
        Console.WriteLine(Environment.NewLine + "Vous êtes connecté !");
        isOk = true;
    }

    else
    {
        if(remainingAttemps == 0)
        {
            Console.WriteLine(Environment.NewLine + "Votre compte est bloqué !");
        }

        else
        {
            Console.WriteLine(Environment.NewLine + "Mot de passe incorrect! Il vous reste " + remainingAttemps + " tentatives...");
        }

        Console.WriteLine(" ");
        counter++;
        isOk = false;
    }

    
}
while (remainingAttemps > 0 && !isOk);
bool bicycleState = new Random().Next(100) <= 50 ? true : false;
bool fastRepair = new Random().Next(100) <= 50 ? true : false;
bool bookInLivingroom = new Random().Next(100) <= 50 ? true : false;
bool bookInLibrary = new Random().Next(100) <= 50 ? true : false;
string weather;


do
{
    Console.WriteLine("Fait-il beau ? Oui (o) / Non (n)");
    weather = Console.ReadLine();
    weather = weather.ToLower();
} while (weather != "oui" && weather != "o" && weather != "non" && weather != "n");

bool weatherIsGood = weather == "oui" || weather == "o";

if (weatherIsGood)
{
    Console.WriteLine("Il fait beau, je vais me ballader !");

    if (!bicycleState)
    {
        Console.WriteLine("Ma bicyclette ne fonctionne pas correctement, je dois passer chez le garagiste.");

        if (!fastRepair)
        {
            Console.WriteLine("Je renonce à ma ballade en vélo et je vais à pied jusqu'à l'étang pour cueillir les joncs.");
        }
    }

    else
    {
        Console.WriteLine("Je vais y aller à bicyclette.");
    }
}

else
{
    Console.WriteLine("Il ne fait pas beau, je vais passer ma journée à lire.");

    if (!bookInLivingroom)
    {
        Console.Write("Je passe à la bibliothèque emprunter ");

        if (!bookInLibrary)
        {
            Console.WriteLine("un roman policier, ");
        }

        else
        {
            Console.WriteLine("le 1er tome de GOT, ");
        }

        Console.WriteLine("puis je rentre à la maison.");
    }

    Console.WriteLine("Je vais me poser dans mon fauteuil et me plonger dans la lecture.");
}

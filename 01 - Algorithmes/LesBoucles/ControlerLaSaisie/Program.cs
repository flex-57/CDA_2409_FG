using FabriceTools;

// Variables
string ?userName;
bool isOk;

// 
do
{
    // Affiche le form tant que le prénom n'est pas correct (2 caractères alphabétiques minimum)
    do
    {
        isOk = true;

        Console.WriteLine("Comment vous appelez-vous?");
        userName = Console.ReadLine();

        if (userName.Length < 2)
        {
            Console.WriteLine(Environment.NewLine + "Le prénom doit contenir au moins 2 caractères !");

            isOk = false;
        }

        if (!userName.All(char.IsLetter))
        {
            Console.WriteLine(Environment.NewLine + "Le prénom ne doit contenir que des caractères alphabétiques !");

            isOk = false;
        }
    }
    while (!isOk);

    // Affichage final
    Console.WriteLine(Environment.NewLine + "Bonjour " + userName);
}
while (ConsolePrompt.TryAgain());


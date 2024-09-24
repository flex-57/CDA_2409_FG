Console.WriteLine("Quel est votre age ?");
int age = int.Parse(Console.ReadLine());

Console.WriteLine("Réponse :");
if (age > 0)
{
    if(age < 18) Console.WriteLine("Vous êtes mineur !");
    else Console.WriteLine("Vous êtes majeur !");
}
else
{
    Console.WriteLine("Vous n'êtes pas encore né !");
}

Console.WriteLine("\nAppuyez sur entrée pour continuer.");
Console.ReadLine();
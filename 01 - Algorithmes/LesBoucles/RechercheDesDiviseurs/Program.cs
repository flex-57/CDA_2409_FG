int num;
bool isOk;
bool hasDiviseurs = false;

do
{
    Console.WriteLine("Veuillez entrer un nombre :");
    isOk = int.TryParse(Console.ReadLine(), out num );

    if (!isOk)
    {
        Console.WriteLine(Environment.NewLine + "Ce n'est pas un nombre !" + Environment.NewLine);
    }
}
while (!isOk);

Console.WriteLine(Environment.NewLine + "Résultat :" + Environment.NewLine);

for (int i = 2; i < num; i++)
{
    if (num % i == 0)
    {
        Console.Write(i + " " + Environment.NewLine);
        hasDiviseurs = true;
    }
}

if (!hasDiviseurs)
{
    Console.WriteLine("Il n'y a pas de diviseurs entiers !" + Environment.NewLine);
}

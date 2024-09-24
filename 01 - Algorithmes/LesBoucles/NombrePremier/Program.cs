int number;
bool isOk;
bool isPrimary = true;

do
{
    Console.WriteLine("Veuillez entrer un nombre :");
    isOk = int.TryParse(Console.ReadLine(), out number );

    if (!isOk || number < 2)
    {
        Console.WriteLine("Ce n'est pas un nombre valide !");
    }
}
while (!isOk || number < 2);

for (int i = 2; i <= number * number; i++)
{
    if (number % i == 0)
    {
        isPrimary = false;
    }
}

if (!isPrimary)
{
    Console.WriteLine(number + " n'est pas un nombre premier !");
}

else
{
    Console.WriteLine(number + " est un nombre premier !");
}

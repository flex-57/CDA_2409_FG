int number;
bool isOk;
bool isPrime = true;

do
{
    Console.WriteLine("Veuillez entrer un nombre :");
    isOk = int.TryParse(Console.ReadLine(), out number) || number >= 1;

    if (!isOk)
    {
        Console.WriteLine("Ce n'est pas un nombre valide !");
    }
}
while (!isOk);

for (int i = 2; i <= Math.Sqrt(number); i++)
{
    if (number % i == 0)
    {
        isPrime = false;
    }
}

if (!isPrime)
{
    Console.WriteLine($"{number} n'est pas un nombre premier !");
}

else
{
    Console.WriteLine($"{number} est un nombre premier !");
}

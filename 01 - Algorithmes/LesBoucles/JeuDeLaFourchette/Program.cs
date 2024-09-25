int mysteriousNumber = new Random().Next(100);
int number;
int forkMax = 100;
int forkMin = 0;
int count = 1;
bool isOk;

do
{
    Console.WriteLine($"Veuillez entrer un nombre entier positif entre {forkMin} et {forkMax}");
    isOk = int.TryParse(Console.ReadLine(), out number);

    if(!isOk)
    {
        Console.WriteLine("Ce n'est pas un nombre !");
    }

    else if(number < 0 || number > 100)
    {
        Console.WriteLine($"Le nombre doit être un entier positif entre {forkMin} et {forkMax} !");
        isOk = false;
    }

    if (mysteriousNumber < number)
    {
        forkMax = number;
        Console.WriteLine("Trop grand !");
        isOk = false;
        count++;
    }

    else if (mysteriousNumber > number)
    {
        forkMin = number;
        Console.WriteLine($"Trop petit !");
        isOk = false;
        count++;
    }

    else
    {
        Console.WriteLine($"Bien joué ! Vous avez trouvé le nombre mystère en {count} fois !");
        isOk = true;
    }
}
while (!isOk);


int mysteriousNumber = new Random().Next(100);
int number;
int valMax = 100;
int valMin = 0;
int count = 1;
bool isOk;

do
{
    Console.WriteLine($"Veuillez entrer un nombre entier positif entre {valMin} et {valMax}");
    isOk = int.TryParse(Console.ReadLine(), out number);

    if (!isOk)
    {
        Console.WriteLine("Ce n'est pas un nombre !");
    }

    else
    {
        if (number < valMin || number > valMax)
        {
            Console.WriteLine($"Le nombre doit être un entier positif entre {valMin} et {valMax} !");
            isOk = false;
        }

        count++;

        if (mysteriousNumber < number)
        {
            valMax = number;
            Console.WriteLine("Trop grand !");
            isOk = false;
        }

        else if (mysteriousNumber > number)
        {
            valMin = number;
            Console.WriteLine("Trop petit !");
            isOk = false;
        }

        else
        {
            Console.WriteLine($"Bien joué ! Vous avez trouvé le nombre mystère en {count} tentatives !");
            isOk = true;
        }
    }
}
while (!isOk);

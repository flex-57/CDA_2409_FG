int A;
int B;
bool isNumOk;

int readAndParse(string text)
{
    do
    {
        isNumOk = true;

        Console.WriteLine(Environment.NewLine + text);
        string inputA = Console.ReadLine();

        if (!int.TryParse(inputA, out A))
        {
            Console.WriteLine(Environment.NewLine + "Ce n'est pas un nombre !");

            isNumOk = false;
        }
    }
    while (!isNumOk);

    return A;
}


Console.WriteLine("Intervalle :");

A = readAndParse("Veuillez entrer un premier nombre :");
B = readAndParse("Veuillez entrer un deuxième nombre :");

Console.WriteLine(Environment.NewLine + "Résultat :" + Environment.NewLine);

if(A < B)
{
    for(int i = A + 1;  i < B; i++)
    {
        Console.Write(i + " ");
    }
}

else if(A > B)
{
    for (int i = A - 1; i > B; i--)
    {
        Console.Write(i + " ");
    }
}

else
{
    Console.WriteLine("Les deux nombres ont la même valeur !");
}

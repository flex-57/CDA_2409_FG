int A;
int B;
bool isNumOk;

int readAndParse(string text)
{
    int i = 0;

    do
    {
        isNumOk = true;

        Console.WriteLine(Environment.NewLine + text);
        string input = Console.ReadLine();

        if (!int.TryParse(input, out i))
        {
            Console.WriteLine(Environment.NewLine + "Ce n'est pas un nombre !");

            isNumOk = false;
        }
    }
    while (!isNumOk);

    return i;
}


Console.WriteLine("Intervalle :");

A = readAndParse("Veuillez entrer un premier nombre :");
B = readAndParse("Veuillez entrer un deuxième nombre :");

Console.WriteLine(Environment.NewLine + "Résultat :" + Environment.NewLine);

while (A < B - 1)
{
    A++;
    Console.Write(A + " ");
}

while (A > B + 1)
{
    A--;
    Console.Write(A + " ");
}

if(A == B)
{
    Console.WriteLine("Les deux nombres ont la même valeur !");
}

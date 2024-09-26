int[] numbers = [8, 16, 32, 64, 128, 256, 512];
int N = 0;
bool isOk = false;

while(!isOk)
{
    Console.WriteLine("Veuillez entrer un nombre :");
    isOk = int.TryParse(Console.ReadLine(), out N);
}

int index = Array.FindIndex(numbers, n => n.Equals(N));

if(index != -1)
{
    Console.WriteLine($"Valeur de l'indice correspondant à {N} : {index}");
}

else
{
    Console.WriteLine("Nombre non trouvé !");
}
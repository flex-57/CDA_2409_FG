int[] numbers = [8, 16, 32, 64, 128, 256, 512];
int number = 0;
bool isOk = false;

while(!isOk)
{
    Console.WriteLine("Veuillez entrer un nombre :");
    isOk = int.TryParse(Console.ReadLine(), out number);
}

int index = Array.FindIndex(numbers, n => n.Equals(number));

if(index != -1)
{
    Console.WriteLine($"Valeur de l'indice correspondant à {number} : {index}");
}

else
{
    Console.WriteLine("Nombre non trouvé !");
}
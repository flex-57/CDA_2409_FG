Console.WriteLine("Veuillez entrer un premier nombre :");
int A = int.Parse(Console.ReadLine());
Console.WriteLine("Veuillez entrer un deuxième nombre :");
int B = int.Parse(Console.ReadLine());

Console.WriteLine("\nValeurs triées dans l'ordre croissant :");

if (A < B) Console.WriteLine(A + " " + B);
else Console.WriteLine(B + " " + A);

Console.WriteLine("\nAppuyez sur entrée pour continuer.");
Console.ReadLine();

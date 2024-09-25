Console.WriteLine("Quel est votre age ?");
int age = int.Parse(Console.ReadLine());

int age_retraite = 60;

Console.WriteLine("Réponse :");

if (age == age_retraite) Console.WriteLine("C’est le moment de prendre sa retraite.");

else if (age > age_retraite) Console.WriteLine("Vous êtes à la retraite depuis " + (age - age_retraite) + " années");

else if (age < age_retraite) Console.WriteLine("Il vous reste " + (age_retraite - age) + " années avant la retraite.");

else Console.WriteLine("La valeur fournie n’est pas un âge valide.");

Console.WriteLine("\nAppuyez sur entrée pour continuer.");
Console.ReadLine();

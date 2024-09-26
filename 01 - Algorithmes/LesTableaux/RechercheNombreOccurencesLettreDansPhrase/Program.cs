string text = "";
string letter = "";

Console.WriteLine("Veuillez écrire une phrase :");
text = Console.ReadLine();

if(text.Length > 0 && text.Substring(text.Length - 1, 1) != ".")
{
    text = $"{text}.";
}

while (letter.Length == 0)
{
    Console.WriteLine("Veuillez choisir une lettre :");
    letter = Console.ReadLine();
}

int nbLetters = text.Count(c => c == char.Parse(letter));

if (text.Length < 2)
{
    Console.WriteLine("La phrase est vide !");
}

else if(nbLetters == 0)
{
    Console.WriteLine("La lettre n’est pas présente !");
}

else
{
    Console.WriteLine($"La lettre est présente {nbLetters} fois !");
}

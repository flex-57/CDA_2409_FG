﻿using System.Globalization;

Console.WriteLine("Veuillez entrer un premier nombre :");
int A = int.Parse(Console.ReadLine());
Console.WriteLine("Veuillez entrer un deuxième nombre :");
int B = int.Parse(Console.ReadLine());
Console.WriteLine("Veuillez entrer un troisième nombre :");
int C = int.Parse(Console.ReadLine());

int[] arrayNum = new int[]
{
    A, B, C
};

Array.Sort(arrayNum);

Console.WriteLine("\nValeurs triées dans l'ordre croissant :");

foreach (int i in arrayNum)
{
    Console.WriteLine(i);
}

Console.WriteLine("\nAppuyez sur entrée pour continuer.");
Console.ReadLine();
namespace LearnLists3
{
    internal class Program
    {

        private static void Main(string[] args)
        {
            List<User> users = new();
         
            users.Add(new MajorUser("fab", "flex", new DateTime(1992, 08, 12), "dev"));

            foreach (var user in users)
            {
                Console.WriteLine(user.FullName);
            }

        }
    }
}

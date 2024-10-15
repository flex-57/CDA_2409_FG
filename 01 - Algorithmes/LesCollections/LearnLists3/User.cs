namespace LearnLists3
{
    public abstract class User
    {
        // public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        private DateTime BirthDate { get; set; }

        public User(string? _firstName, string? _lastName, DateTime _birthDate)
        {
            FirstName = _firstName;
            LastName = _lastName;
            BirthDate = _birthDate;
            FullName = $"{UcFirst(FirstName ?? "")} {UcFirst(LastName ?? "")}";
        }

        // A mettre dans une dépendance
        public static string? UcFirst(string _val)
        {
            return char.ToUpper(_val[0]) + _val.Remove(0, 1);
        }
    }

    public class MajorUser(string? _firstName, string? _lastName, DateTime _birthDate, string? _job) : User(_firstName, _lastName, _birthDate)
    {
        public string? Job { get; set; } = _job;
    }

    public class MinorUser(string? _firstName, string? _lastName, DateTime _birthDate, string? _color) : User(_firstName, _lastName, _birthDate)
    {
        public string? Color { get; set; } = _color;
    }
}

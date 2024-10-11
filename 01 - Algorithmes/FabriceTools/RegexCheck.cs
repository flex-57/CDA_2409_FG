using System.Text.RegularExpressions;

namespace FabriceTools
{
    public class RegexCheck
    {
        static Regex reg;
        public static bool creditCard(string _val)
        {
            return (new Regex(@"^([\d]{4}[ -]?){4}$")).IsMatch(_val);
        }

        public static bool telephoneNumber(string _val)
        {
            return (new Regex(@"^(0[1-9]{1}[ -]?){1}([\d]{2}[ -]?){4}$")).IsMatch(_val);
        }

        public static bool email(string _val)
        {
            return (new Regex(@"^$")).IsMatch(_val);
        }

        public static bool password(string _val)
        {
            string pattern;

            if (_val.Length > 20)
            {
                pattern = @"(?=.*[a-z])(?=.*[A-Z])(?=.*\d)^[a-zA-Z\d]{21,}$";
            }
            else
            {
                pattern = @"(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])^[a-zA-Z\d\W]{12,}$";
            }

            return (new Regex(pattern)).IsMatch(_val);
        }

        /*
        public static bool date(string _val)
        {
            return new Regex(@"");
        }
        */
    }
}

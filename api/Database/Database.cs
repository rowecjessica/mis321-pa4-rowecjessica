using pa4;
// using MySql.Data.MySqlClient;

namespace pa4
{
    public class Database
    {
        private string host{get; set;}
        private string database{get; set;}
        private string username{get; set;}
        private string port{get; set;}
        private string password{get; set;}

        public string cs {get; set;}


        public Database()
        {
            host = "nnsgluut5mye50or.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            database = "f6jbxgjaa878dqy3";
            username = "rfdoibr4o6rnlq5m";
            port = "3306";
            password = "hd1mdrnzfq2movwn";
            cs = $"server={host};user={username};database={database};port={port};password={password}";
        }



        
    }
}
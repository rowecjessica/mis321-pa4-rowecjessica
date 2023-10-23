using MySql.Data.MySqlClient;
using api.Model;
using pa4;

namespace api
{
    public class ExcerciseUtility
    {
        public List<Excercise> GetAllExcercises()
        {
            List<Excercise> myExcercises = new List<Excercise>();

            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "SELECT * from excercise WHERE Deleted = 0;";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader(); 

            while (rdr.Read()) 
            { 
            	myExcercises.Add(new Excercise
                {
                    ExceId = rdr.GetInt32(0),
                    Day = rdr.GetString(1),
                    Type = rdr.GetString(2),
                    Distance = rdr.GetString(3),
                    Pinned = rdr.GetBoolean(4),
                    Deleted = rdr.GetBoolean(5)
        
                });
            }

            con.Close();
            return myExcercises;
        }

        public static void AddExcercise(Excercise excercise)
        {
    
            
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "INSERT INTO excercise(ExceId, Day, Type, Distance, Pinned, Deleted) VALUES(@ExceId, @Day, @Type, @Distance, @Pinned, @Deleted)";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@ExceId", excercise.ExceId);
            cmd.Parameters.AddWithValue("@Day", excercise.Day);
            cmd.Parameters.AddWithValue("@Type", excercise.Type);
            cmd.Parameters.AddWithValue("@Distance", excercise.Distance);
            cmd.Parameters.AddWithValue("@Pinned", excercise.Pinned);
            cmd.Parameters.AddWithValue("@Deleted", excercise.Deleted);

            cmd.ExecuteNonQuery();


            con.Close();
        }



        public static void EditExcercise(int ExceId , Excercise excercise)
        {
            Database db = new Database();
            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "UPDATE excercise set Day = @Day, Type = @Type, Distance = @Distance, Pinned = @Pinned, Deleted = @Deleted WHERE ExceId = @ExceId;";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@ExceId", ExceId);
            cmd.Parameters.AddWithValue("@Day", excercise.Day);
            cmd.Parameters.AddWithValue("@Type", excercise.Type);
            cmd.Parameters.AddWithValue("@Distance", excercise.Distance);
            cmd.Parameters.AddWithValue("@Pinned", excercise.Pinned);
            cmd.Parameters.AddWithValue("@Deleted", excercise.Deleted);

            cmd.ExecuteNonQuery();


            con.Close();


        }
    }
}


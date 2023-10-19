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

            string stm = "SELECT * from excercise";
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
            // cmd.CommandText = @"UPDATE excercise set ExceId = @newExceId, Day = @newDay WHERE Id = @id";

            con.Close();
            return myExcercises;
        }

        // public List<Excercise> AddAnExcercise()
        // {
        //     List<Excercise> myExcercises = new List<Excercise>();

        //     Database db = new Database();
        //     using var con = new MySqlConnection(db.cs);
        //     con.Open();

        //     cmd.CommandText = @"INSERT INTO excercise(Day, Type, Distance, Pinned, Deleted) 
	    //     VALUES(@Day, @Type, @Distance, @Pinned, @Deleted)";


        //     // cmd.Parameters.AddWithValue("@ExceId", newExceId);
        //     cmd.Parameters.AddWithValue("@Day", day);
        //     cmd.Parameters.AddWithValue("@Type", type);
        //     cmd.Parameters.AddWithValue("@Distance", distance);
        //     cmd.Parameters.AddWithValue("@Pinned", pinned);
        //     cmd.Parameters.AddWithValue("@Deleted", deleted);

        //     // cmd.Parameters.AddWithValue("@pageCount", 320);
        //     cmd.Prepare();
        //     cmd.ExecuteNonQuery();


        //     con.Close();

        // }
    }
}


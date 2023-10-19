using pa4;
using MySql.Data.MySqlClient; 

// int newExceId = ;
string newDay = "06/26/2023";
string newType = "Running";
string newDistance = "5";
bool newPinned = false;
bool newDeleted = false;

Database db = new Database();
using var con = new MySqlConnection(db.cs);
con.Open();

string stm = "SELECT * from excercise";
using var cmd = new MySqlCommand(stm, con);

// using MySqlDataReader rdr = cmd.ExecuteReader(); 

// while (rdr.Read()) 
// { 
// 	Console.WriteLine($"{rdr.GetInt32(0)} {rdr.GetString(1)} {rdr.GetString(2)}"); 
// }
// cmd.CommandText = @"UPDATE excercise set ExceId = @newExceId, Day = @newDay WHERE Id = @id";



//here SPLIT //////////////////////////////////////////////////


cmd.CommandText = @"INSERT INTO excercise(Day, Type, Distance, Pinned, Deleted) 
	VALUES(@Day, @Type, @Distance, @Pinned, @Deleted)";


// cmd.Parameters.AddWithValue("@ExceId", newExceId);
cmd.Parameters.AddWithValue("@Day", newDay);
cmd.Parameters.AddWithValue("@Type", newType);
cmd.Parameters.AddWithValue("@Distance", newDistance);
cmd.Parameters.AddWithValue("@Pinned", newPinned);
cmd.Parameters.AddWithValue("@Deleted", newDeleted);

// cmd.Parameters.AddWithValue("@pageCount", 320);
cmd.Prepare();
cmd.ExecuteNonQuery();


con.Close();

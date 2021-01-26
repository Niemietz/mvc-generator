export default function(database) {
    let result = ""

    result =
`<?php
namespace App\\Data;

class DAO
{
	// LOCAL
	private static $host = '${database.host}';
	private static $user = '${database.user}';
	private static $password = '${database.password}';
	private static $db = '${database.database}';

	private static $dbcon;

	function __construct()
	{
		self::startConnection();
	}

	private static function startConnection()
	{
		self::$dbcon = new \\mysqli(self::$host, self::$user, self::$password, self::$db);

		self::checkConnection();
		self::serverIsUp();
	}

	private static function checkConnection()
	{
		// CHECK CONNECTION
		if (self::$dbcon->connect_error)
		{
		    $db_error = self::$dbcon->connect_error;

		    throw new \\Exception("Connection failed: " . $db_error);
		}
	}

	private static function serverIsUp()
	{
		// CHECK IF SERVER IS ALIVE
		if (self::$dbcon->ping() == false)
		{
		    $db_error = self::$dbcon->error;

			throw new \\Exception("Database server error: " . $db_error);
		}
	}

	private static function getConnection()
	{
		if(is_null(self::$dbcon))
		{
			self::startConnection();
		}
		else
		{
			self::serverIsUp();
		}

		return self::$dbcon;
	}

	public static function closeConnection()
	{
		if(is_null(self::$dbcon) == false)
		{
			self::serverIsUp();

			self::$dbcon->close();

			self::$dbcon = null;
		}
	}

	public static function startTransaction()
	{
		return self::executeQuery('START TRANSACTION');
	}

	public static function commitTransaction()
	{
		return self::executeQuery('COMMIT');
	}

	public static function rollbackTransaction()
	{
		return self::executeQuery('ROLLBACK');
	}

	public static function executeQuery($query)
	{
		$result = null;

		try
		{
			self::getConnection()->query("SET NAMES 'utf8'");
			self::getConnection()->query("SET character_set_connection=utf8");
			self::getConnection()->query("SET character_set_client=utf8");
			self::getConnection()->query("SET character_set_results=utf8");
			$result = self::getConnection()->query($query);
		}
		catch(\\Exception $error)
		{
			throw new \\Exception($error . "\\n\\n" . $query);
		}

		return $result;
	}

	public static function executeQueryAndGetId($query)
	{
		$result = 0;

		self::getConnection()->query("SET NAMES 'utf8'");
		self::getConnection()->query("SET character_set_connection=utf8");
		self::getConnection()->query("SET character_set_client=utf8");
		self::getConnection()->query("SET character_set_results=utf8");
		$sql = self::getConnection()->query($query);

		if ($sql == true)
	    {
	        $result = self::getConnection()->insert_id;
	    }
	    else
	    {
	        $error = self::getConnection()->error;
	        self::closeConnection();
	        throw new \\Exception($error . "\\n\\n" . $query);
	    }

	    return $result;
	}

	public static function executeQueryAndGetNumberOfAffectedRows($query)
	{
		$result = 0;

		try
		{
			self::getConnection()->query("SET NAMES 'utf8'");
			self::getConnection()->query("SET character_set_connection=utf8");
			self::getConnection()->query("SET character_set_client=utf8");
			self::getConnection()->query("SET character_set_results=utf8");
			$result = self::getConnection()->query($query);
		}
		catch(\\Exception $error)
		{
			throw new \\Exception($error . "\\n\\n" . $query);
		}

	    return $result;
	}
}
`

    return result
}
exports.getText = function(database) {
    let result = ""

    result =
`<?php
namespace App\\Data;

error_reporting(E_ALL & ~E_WARNING);

class DAO
{
	// LOCAL
	private $host = '${database.host}';
	private $user = '${database.user}';
	private $password = '${database.password}';
	private $db = '${database.database}';

	private $dbcon;

	function __construct()
	{
		$this->startConnection();
	}

	private function startConnection()
	{
		$this->dbcon = new \\mysqli($this->host, $this->user, $this->password, $this->db);

		$this->checkConnection();
		$this->serverIsUp();
	}

	private function checkConnection()
	{
		// CHECK CONNECTION
		if ($this->dbcon->connect_error)
		{
		    $db_error = $this->dbcon->connect_error;

		    throw new \\Exception("Connection failed: " . utf8_encode($db_error));
		}
	}

	private function serverIsUp()
	{
		// CHECK IF SERVER IS ALIVE
		if ($this->dbcon->ping() == false)
		{
		    $db_error = $this->dbcon->error;

			throw new \\Exception("Database server error: " . utf8_encode($db_error));
		}
	}

	private function getConnection()
	{
		if(is_null($this->dbcon))
		{
			$this->startConnection();
		}
		else
		{
			$this->serverIsUp();
		}

		return $this->dbcon;
	}

	public function closeConnection()
	{
		if(is_null($this->dbcon) == false)
		{
			$this->serverIsUp();

			$this->dbcon->close();

			$this->dbcon = null;
		}
	}

	public function startTransaction()
	{
		return $this->executeQuery('START TRANSACTION');
	}

	public function commitTransaction()
	{
		return $this->executeQuery('COMMIT');
	}

	public function rollbackTransaction()
	{
		return $this->executeQuery('ROLLBACK');
	}

	public function executeQuery($query)
	{
		$result = null;

		try
		{
			$this->getConnection()->query("SET NAMES 'utf8'");
			$this->getConnection()->query("SET character_set_connection=utf8");
			$this->getConnection()->query("SET character_set_client=utf8");
			$this->getConnection()->query("SET character_set_results=utf8");
			$result = $this->getConnection()->query($query);
		}
		catch(\\Exception $error)
		{
			throw new \\Exception($error . "\\n\\n" . $query);
		}

		return $result;
	}

	public function executeQueryAndGetId($query)
	{
		$result = 0;

		$this->getConnection()->query("SET NAMES 'utf8'");
		$this->getConnection()->query("SET character_set_connection=utf8");
		$this->getConnection()->query("SET character_set_client=utf8");
		$this->getConnection()->query("SET character_set_results=utf8");
		$sql = $this->getConnection()->query($query);

		if ($sql == true)
	    {
	        $result = $this->getConnection()->insert_id;
	    }
	    else
	    {
	        $error = $this->getConnection()->error;
	        $this->closeConnection();
	        throw new \\Exception($error . "\\n\\n" . $query);
	    }

	    return $result;
	}

	public function executeQueryAndGetNumberOfAffectedRows($query)
	{
		$result = 0;

		try
		{
			$this->getConnection()->query("SET NAMES 'utf8'");
			$this->getConnection()->query("SET character_set_connection=utf8");
			$this->getConnection()->query("SET character_set_client=utf8");
			$this->getConnection()->query("SET character_set_results=utf8");
			$result = $this->getConnection()->query($query);
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